const express = require('express');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res)=>{
    res.send("From Router");
});

router.post('/register', (req, res)=>{

    const {name, email, phone, work, password, cpassword} = req.body; // Destructuring the object

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:" Please fill all datafields!"});
    }

    res.json({message: req.body});

    User.findOne({email: email}).then((userExists) => {
        if(userExists)
        return res.status(422).json({error: "User already exists"});

        const user = new User({name, email, phone, work, password, cpassword});  // es6 allows that if both  key & value have same names, then it could just be wriiten once and no need to write like, name: name, email:email, ...
        user.save().then(()=>{
            res.status(201).json({message: "user registered successfullly"})
        }).catch((err)=>{res.status(500).json({error: "Failed to register"})});

    }).catch((err)=>{console.log("Error: " + err);});

    // Whats happening above?
    // 1st of all we are destructuring the object
    // then we are checking if all the fields are filled or not
    // yes: then we return with error 422
    // no: then we 1st check whether a same email id already exists o not
    //         yes: we return
    //         no: we save the user


});

module.exports = router;