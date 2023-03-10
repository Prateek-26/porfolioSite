const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
require('./db/conn');

const app = express();


const PORT = process.env.PORT;

app.use(express.json());

app.use(require('./routes/auth')); // here we link the route files // working as a middleware

const middleware = (req, res, next) =>{
    console.log("Middleware Speaking");
    // next();
}

app.get("/", (req, res)=>{
    console.log("Working!");
    res.send("Hello Home");
});

app.get('/about', middleware , (req,res)=>{
    res.send("Hello About");
});

app.get('/contact', (req,res)=>{
    res.send("Hello Contact");
});

app.get('/signin', (req,res)=>{
    res.send("Hello Sin");
});

app.get('/signup', (req,res)=>{
    res.send("Hello Sout");
});

app.listen(PORT, ()=>{
    console.log("Server is up and listening on port " + process.env.PORT);
});