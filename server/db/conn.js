const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.set('strictQuery', false); // To resolve the error

mongoose.connect(DB)
.then(()=>{console.log("Successfully connected to the DB");})
.catch((err)=>{console.log("Error: " + err);});