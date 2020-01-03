const express = require('express')
const app = express();
const axios = require('axios')
const { config } = require('./dilog.js')
const googleAuth = require("google-auto-auth");

app.post('/hola', (req, res) => {
    const obj = { msj: "hola mundo" }
    res.send(obj)
})


app.post('/Bot', async (req, res) => {
    const {MESSAGE}  = req.body;
    try {
        
        const auth = googleAuth({
            keyFilename: '../JarvisKey.json',
            //keyFilename: '../dialogKey.json',
            scopes: ["https://www.googleapis.com/auth/cloud-platform", "https://www.googleapis.com/auth/dialogflow"]
        });
        
        const data = {
            queryInput: {
                text: {
                    text: `${MESSAGE}`,
                    languageCode: "es"
                }
            },
            queryParams: {
                timeZone: "America/Guatemala"
            }
        }

        return auth.getToken((err, token) => {
            if (err) {
                console.error(err)
                throw new Error(err)
            }
            //console.log(config.host().replace(/\s/g,''))
            console.log("Token: " + token)
            return axios({
                method: "post",
                url: config.host(),
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

            }).then(response => {
                const {
                    fulfillmentText,
                    intent
                } = response.data.queryResult;
                //console.log(response)
                return res.send({botsay : fulfillmentText})
            }).catch(err => err)
        })
    }
    catch (err) {
        return res.status(400).send({ error: err })
    }

})

module.exports.app = app;
//module.exports.router = router;