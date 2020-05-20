const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const app = express();
var serviceAccount = require("./Utils/key.json");
const server = require("http").createServer(app)
const io = require("socket.io").listen(server)
const port = 3000

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firstfire-f0b06.firebaseio.com"
});

const bodyParser = require("body-parser");
const cors = require("cors");
const { ErrorHandler, handleError } = require("./Error");
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

io.on("connection", socket => {
    socket.on("add", obj => {
        console.log(obj)
        io.emit('put', obj )
    })
    console.log("usuario conectado")
})
server.listen(port, () => {
    console.log("server on port: ", port)
})

exports.API = functions.https.onRequest(app);
