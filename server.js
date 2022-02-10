//Nødvendige applikation brugt til projektet
const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('./data').userDB;
const formData = require('express-form-data');
const app = express();
const server = http.createServer(app);

//Paths til front-end
app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

//Speciferer hvor uploadet billeder skal ende henne
const options = {
    uploadDir: './uploads'
}



//Tomt array til varer brugeren har lagt op
const products = [];

//POST method med path og callbacks med henblik på formData 
app.post('/item', formData.parse(options), (req, res, next) => {
let { title, price, category } = req.body;
let thumbnail = req.files.thumbnail.path.replace('\\', '/');

//Produktet pushes til vores tomme array
products.push({ title, price, category, thumbnail });
console.log(products);
    });

//Routing respons til client request
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

//Post method til brugere ved registrering af ny konti
app.post('/register', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
    
            let hashPassword = await bcrypt.hash(req.body.password, 10);
    
            let newUser = {
                id: Date.now(),
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser); //Såfremt succes, pushes ovenstående ind i array
            console.log('User list', users);
    //Success:
            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        } //Failure:
    } catch{
        res.send("Internal server error");
    }
});


//Samme logik, blot med login. Leder array igennem efter user ssubmittedPass samt storedPass. Hvis de matcher, kan man logge ind
app.post('/login', async (req, res) => {
    try{
        let foundUser = users.find((data) => req.body.email === data.email);
        if (foundUser) {
    
            let submittedPass = req.body.password; 
            let storedPass = foundUser.password; 
    
            const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
            if (passwordMatch) { //Success
                let usrname = foundUser.username; 
                res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello ${usrname}</h3></div><br><br><div align='center'><a href='./login.html'>logout</a></div> <br><br><div align='center'><a href='./list.html'>Create a new listing</a></div>`);
            } else { //Failure 1
                res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        }
        else { //Failure 2
    
            let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
            await bcrypt.compare(req.body.password, fakePass);
    
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");
        }
    } catch{ //Catch error
        res.send("Internal server error");
    }
});
//Til at få vist en tabel, benyttes app.get som responser arrayet, products
app.get('/items', (req, res) => {
    res.json(products);
});

//Serveren lytter til port:3000 og bliver bekræftet i funktionalitet hver gang den startes
server.listen(3000, function(){
    console.log("server is listening on port: 3000");
});