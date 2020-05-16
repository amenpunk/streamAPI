const { db, ErrorHandler } = require("../index");

async function SetStream(req, res) {
    try {
        const { URL, Name } = req.body;

        await db
            .collection("Platforms")
            .doc(Mail)
            .update({
                [name]: URL
            });
        return res.send({ Success: "Tu nuevo stream ha sido agregado!!!" });
    } catch (err) {
        console.log(err.message);
        return res.send({ Error: "No pudimos se pudo localizar el server" });
    }
}

async function GetStream(req, res) {
    try {
        console.log("request start");
        const { Mail } = req.body;

        const snap = await db
            .collection("Platforms")
            .doc(Mail)
            .collection("List")
            .get();

        const platList = snap.docs.map(ele => ele.data());
        if (platList.length >= 1) {
            const plataformas = platList.map(plat => {
                let tem = {
                    app: plat.Name,
                    mode: "push",
                    edge: plat.URL,
                    appendName: false
                };
                return tem;
            });

            return res.send(plataformas);
        } else {
            let tem = [
                {
                    app: "",
                    mode: "push",
                    edge: "No tienes ninguna plataforma configurada",
                    appendName: false
                }
            ];
            return res.send(tem);
        }
    } catch (err) {
        console.log(err);
        let tem = [
            {
                app: "",
                mode: "push",
                edge: "No tienes ninguna plataforma configurada",
                appendName: false
            }
        ];
        return res.send(tem);
    }
}

async function DeleteStream(req, res) {
    const { Mail, URL } = req.body;
    console.log(req.body);

    try {
        const snap = await db
            .collection("Platforms")
            .doc(Mail)
            .collection("List")
            .where("URL", "==", URL)
            .get();
        const listSnap = snap.docs.map(ele => {
            let temp = { ID: ele.id };
            Object.assign(temp, ele.data());
            return temp;
        });

        if (listSnap.length >= 1) {
            const { ID } = listSnap.shift();
            await db
                .collection("Platforms")
                .doc(Mail)
                .collection("List")
                .doc(ID)
                .delete();
            return res.send({
                status: 1,
                message: "Stream eliminado"
            });
        } else {
            return res.send({
                status: 0,
                message: "Stream no pudo ser  eliminado"
            });
        }
    } catch (err) {
        return res.send({
            status: 0,
            message: "Stream no puso ser eliminado",
            reason: err.message
        });
    }
}

async function AddStream(req, res, next) {
    const { Mail, URL } = req.body;

    try {
        if (!Mail || !URL) {
            throw new ErrorHandler(200, "El campo es requerido");
        }
        const add = await db
            .collection("Platforms")
            .doc(Mail)
            .collection("List")
            .add({
                Name: "live",
                URL: URL
            });

        if (add.id) {
            return res.send({
                status: 1,
                message: "Stream agregado",
                reason: add.id
            });
        } else {
            throw new ErrorHandler(200, "No pudimos agregar tu stream");
        }
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    SetStream,
    AddStream,
    GetStream,
    DeleteStream
};
