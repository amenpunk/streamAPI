const express = require('express')
const app = express();
const axios = require('axios')
const {config} = require('./dilog.js')
exports.app = app;

app.post('/hola', (req,res) => {
    const obj = { msj : "hola mundo"}
    res.send(obj)
})


app.post('/Bot' , async (req,res) => {

    const token = "e9f4c0d0fb9a4604a14c7ec811ad13af"
    const data = {
        "query_input": {
            "text": {
                "text": "musica",
                "language_code": "es"
            }
        }
    }

    console.log(config.host())
    axios({
        method : "post",
        url : config.host(),
        data : data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

    }).then( response => {
        return res.send(response)
    }).catch( err => res.send({ err : err.toString()}))


})
