const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
require('./db/conn');

const app = express();


const PORT = process.env.PORT;

// Allow JSON data to make communication with API. Allow the JSON data in a request by adding middleware for the body parser.
app.use(express.json()); // so that express can understand JSON

app.use(require('./routes/auth')); // here we link the route files // working as a middleware

const middleware = (req, res, next) =>{
    console.log("Middleware Speaking");
    // next();
}

app.get("/", middleware,(req, res)=>{
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