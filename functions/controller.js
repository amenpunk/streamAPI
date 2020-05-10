"use strict";

const express = require("express");
const StreamController = require("./Models/Stream");
const UserController = require("./Models/Users");

const api = express.Router();
const user = express.Router();

api.post("/Get/", StreamController.GetStream);
api.delete("/Delete", StreamController.DeleteStream);
api.post("/Add", StreamController.AddStream);
api.put("/Set", StreamController.SetStream);

user.post("/Add", UserController.AddUser);

module.exports = {
    api,
    user
};
