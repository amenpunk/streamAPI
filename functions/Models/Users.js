const { db, ErrorHandler } = require("../index");
const admin = require("firebase-admin");
const { Tools } = require("../Utils/tools");
const JWT = require("jsonwebtoken");

const SECRET = "ANIME-BITCHES";

async function AddUser(req, res, next) {
    try {
        const { Email, Name, UserID } = req.body;

        const requiredFields = Tools.Fields({ Email, UserID, Name });

        if (requiredFields) {
            throw new ErrorHandler(200, "Ingresa todos los campos");
        }
        
        const TOKEN = JWT.sign({
            UserID,
            Email,
            Name
        }, SECRET)

        const doc = await db.collection("Usuarios").doc(UserID).set({
            Email,
            Name,
            UserID,
            TOKEN
        });

        if (doc.id) {
            return res.send({
                status: 1,
                title: "Exito!!",
                message: "usuario creado exitosamente"
            });
        } else {
            throw new ErrorHandler(400, "No pudimos crear al usuario");
        }
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    AddUser
};
