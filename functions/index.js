const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
admin.initializeApp(functions.config().firebase);
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleError } = require("./Error");
const app = express();
const db = admin.firestore();
exports.db = db;


const { Stream } = require("./controller");


app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/Stream", Stream);

app.use((err, req, res, next) => {
    console.log(err)
    handleError(err, res);
});

exports.API = functions.https.onRequest(app);
