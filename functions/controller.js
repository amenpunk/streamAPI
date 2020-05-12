"use strict";
const { ErrorHandler } = require("./index.js");

const express = require("express");
const StreamController = require("./Models/Stream");
const UserController = require("./Models/Users");
const JWT = require("jsonwebtoken");
const SECRET = "ANIME-BITCHES";

const api = express.Router();
const user = express.Router();

const AUTH = (req, res, next) => {
    const header = req.headers["authorization"];
    try {
        const token = header.split(" ")[1];
        return JWT.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.status(401).send({
                    status: 0,
                    title: "auth problem",
                    message: "No estas autorizado para ver este contenido"
                });
            }
            req.user = user;
            console.log(user);
            return next();
        });
    } catch (err) {
        throw new ErrorHandler(200, err.message);
    }
};

api.use(AUTH);
api.post("/Get/", StreamController.GetStream);
api.delete("/Delete", StreamController.DeleteStream);
api.post("/Add", StreamController.AddStream);
api.put("/Set", StreamController.SetStream);

user.post("/Add", UserController.AddUser);

module.exports = {
    api,
    user
};
