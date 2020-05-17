const { db, ErrorHandler } = require("../index");
const admin = require("firebase-admin");
const { Tools } = require("../Utils/tools");

async function AddUser(req, res, next) {
    try {
        const { Email, Name, UserID } = req.body;

        const requiredFields = Tools.Fields({ Email, UserID, Name });

        if (requiredFields) {
            throw new ErrorHandler(200, "Ingresa todos los campos");
        }
        const doc = await db
            .collection("Usuarios")
            .doc(UserID)
            .set({
                Email,
                Name,
                UserID,
                admin : false,
                Write : new Date(),
            });

        if (doc.writeTime) {
            return res.send({
                status: 1,
                title: "Exito!!",
                message: "usuario creado exitosamente"
            });
            
        } else {
            throw new ErrorHandler(200, "No pudimos crear al usuario");
        }
    } catch (err) {
        console.log(err.message)
        return next(400,err);
    }
}

async function GetUsers(req, res, next) {
    try {
        const users = await admin.auth().listUsers();
        return res.send(users);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    AddUser,
    GetUsers
};
