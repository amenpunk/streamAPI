const { db, ErrorHandler } = require("../index");
const { Tools } = require("../Utils/tools");

async function AddUser(req, res, next) {
    try {
        const { Secret, Email, Token, Name } = req.body;
        const requiredFields = Tools.Fields({ Secret, Email, Token, Name });
        if(requiredFields){
            throw new ErrorHandler(200, "Ingresa todos los campos")
        }
        const doc = await db.collection("Usuarios").add({
            Secret, Email, Token, Name 
        })
        if(doc.id){
            return res.send({
                status : 1,
                title : "Exito!!",
                message : "usuario creado exitosamente"
            })
        }else{
            throw new ErrorHandler(400, "No pudimos crear al usuario")
        }
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    AddUser
};
