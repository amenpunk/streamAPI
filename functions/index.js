const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
admin.initializeApp(functions.config().firebase);
const bodyParser = require("body-parser");
const cors = require("cors");
const { ErrorHandler, handleError } = require("./Error");
const app = express();
const db = admin.firestore();

exports.db = db;
exports.ErrorHandler = ErrorHandler;

const { api, user } = require("./controller");

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/Stream", api);
app.use("/User", user);

app.use((err, req, res, next) => {
    console.log(err);
    handleError(err, res);
});

exports.API = functions.https.onRequest(app);
