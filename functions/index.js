const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ origin: true }));
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

app.post("/SetStream", async (req, res) => {
    try {
        const { URL, Name } = req.body;

        if (!URL || !Name) {
            return res.send({
                Error: "Por favor ingresa un URL o nombre valido"
            });
        }

        await db
            .collection("Platforms")
            .doc(Mail)
            .update({
                [name]: URL
            });
        return res.send({ Success: "Tu nuevo stream ha sido agregado!!!" });
    } catch (err) {
        console.log(err);
        return res.send({ Error: "No pudimos se pudo localizar el server" });
    }
});

app.post("/GetStream", async (req, res) => {
    try {
        console.log("request start");
        console.log(req.body);
        const { Mail, apikey } = req.body;

        if (apikey !== Mail) {
            return res
                .status(401)
                .send({ Error: "No estas autorizado para ver el contenido" });
        }
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
});

app.post("/DeleteStream", async (req, res) => {
    const { Mail, apikey, URL } = req.body;
    console.log(req.body);

    if (apikey !== Mail) {
        return res
            .status(401)
            .send({ Error: "No estas autorizado para ver el contenido" });
    }
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
            message: "Stream no puso ser eliminaod",
            reason: err.message
        });
    }
});

app.post("/AddStream", async (req, res) => {
    const { Mail, apikey, URL } = req.body;
    console.log(req.body);

    try {
        if (apikey !== Mail) {
            return res
                .status(401)
                .send({ Error: "No estas autorizado para ver el contenido" });
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
            return res.send({
                status: 0,
                message: "Stream no pudo ser agregado",
                rason: "gg"
            });
        }
    } catch (err) {
        console.log(err);
        return res.send({
            status: 0,
            message: "Stream no pudo ser agregado",
            rason: err.message.toString()
        });
    }
});

exports.API = functions.https.onRequest(app);
