const express = require('express'); // Benyt Express.JS
const app = express(); // Opret Express.JS App

//Middleware:
const bodyParser = require('body-parser'); // middleware
app.use(bodyParser.urlencoded({ extended: false })); //Aktivering af middleware


