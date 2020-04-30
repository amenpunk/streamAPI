// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express')
const app = express();
const cors = require('cors'); 
app.use(cors({ origin: true  })); 
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


app.post('/getStreamUrl', async(req,res) => {
    try{

        const snap = await db.collection("Usuarios").get()
        const data = snap.docs.map(ele => ele.data())

        if(data.length >=1){
            return res.send(data)
        }else{
            return res.send({"Error" : "No pudimos se pudo localizar el server"})
        }
    }catch(err){
        console.log(err)
        return res.send({"Error" : "No pudimos se pudo localizar el server"})
    }
})

app.post('/GetStream', async (req,res) => {
    try{
        console.log("request start")
        const {Mail} = req.body;
        console.log(Mail)
        const snap = await db.collection("Platforms").doc(Mail).get()  
        const url = snap.data();
        if(snap.exists){
            return res.send(url)
        }else{
            return res.send({"Error" : "No pudimos se pudo localizar el server"})
        }
    }catch(err){
        console.log(err)
        return res.send({"Error" : "No pudimos se pudo localizar el server"})
    }
})


//module.exports.router = router;

exports.API = functions.https.onRequest(app);

