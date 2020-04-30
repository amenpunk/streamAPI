const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express')
const app = express();
const cors = require('cors'); 
app.use(cors({ origin: true  })); 
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


app.post('/SetStream', async(req,res) => {
    try{
        const {URL, Name} = req.body;

        if(!URL || !Name){
            return res.send({"Error" : "Por favor ingresa un URL o nombre valido"})
        }

        await db.collection("Platforms").doc(Mail).update({
            [name]  : URL
        })
        return res.send({"Success" : "Tu nuevo stream ha sido agregado!!!"})
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
        const snap = await db.collection("Platforms").doc(Mail).collection("List").get();
        const platList = snap.docs.map(ele => ele.data())
        if(platList.length >= 1 ){
            const plataformas = platList.map(plat => {
                let tem = {
                    app : plat.Name,
                    mode : "push",
                    edge : plat.URL,
                    appendName : false
                }
                return tem
            })

            return res.send(plataformas)
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

