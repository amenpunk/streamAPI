const { ErrorHandler } = require("./index.js");
const admin = require("firebase-admin");

const express = require("express");
const StreamController = require("./Models/Stream");
const UserController = require("./Models/Users");
const ChatController = require("./Models/Chat");

const api = express.Router();
const user = express.Router();

const AUTH = (req, res, next) => {
    const header = req.headers["authorization"];
    try {
        const token = header.split(" ")[1];
        admin.auth().verifyIdToken(token).then( user => {
            console.log(user);
            return next();
        }).catch(err => {
            console.log(err.message)
            return res.status(403).send({
                status: 0,
                title: "auth problem",
                message: "No estas autorizado para ver este contenido"
            });
        })
    } catch (err) {
        throw new ErrorHandler(403, "No estas authorizado para ver este contenido");
    }
};

// api.use(AUTH);
api.post("/Get/", StreamController.GetStream);
api.delete("/Delete", StreamController.DeleteStream);
api.post("/Add", StreamController.AddStream);
api.put("/Set", StreamController.SetStream);
user.post("/Add/Message", ChatController.addMessage );
user.post("/getMessage", ChatController.getMessage );

user.post("/Add", UserController.AddUser);
user.post("/Get", UserController.GetUsers);

module.exports = {
    api,
    user
};
