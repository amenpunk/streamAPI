'use strict'

const express = require('express');
const StreamController = require('./Models/Stream');

const api = express.Router();

api.post('/Get/', StreamController.GetStream);
api.delete('/Delete', StreamController.DeleteStream);
api.post('/Add', StreamController.AddStream);
api.put('/Set', StreamController.SetStream);

module.exports.Stream = api
