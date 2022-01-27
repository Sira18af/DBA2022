const express = require('express'); // Benyt Express.JS
const app = express(); // Opret Express.JS App

//Middleware:
const bodyParser = require('body-parser'); // middleware
app.use(bodyParser.urlencoded({ extended: false })); //Aktivering af middleware


// Opsætning af rute til Homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
  });

// Opsætning af rute til Login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/static/login.html');
  });

  // Specifikation af login
  app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
  });


  const port = 3000 // Port til applikation
    app.listen(port, () => console.log(`This app is listening on port ${port}`));