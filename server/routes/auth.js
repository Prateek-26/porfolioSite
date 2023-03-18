const { Router } = require('express');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res)=>{
    res.send("From Router");
});


//// **** Using Promises: Storing data online ****
// router.post('/register', (req, res)=>{

//     const {name, email, phone, work, password, cpassword} = req.body; // Destructuring the object

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:" Please fill all datafields!"});
//     }

//     res.json({message: req.body});

//     User.findOne({email: email}).then((userExists) => {
//         if(userExists)
//         return res.status(422).json({error: "User already exists"});

//         const user = new User({name, email, phone, work, password, cpassword});  // es6 allows that if both  key & value have same names, then it could just be wriiten once and no need to write like, name: name, email:email, ...
//         user.save().then(()=>{
//             res.status(201).json({message: "user registered successfullly"})
//         }).catch((err)=>{res.status(500).json({error: "Failed to register"})});

//     }).catch((err)=>{console.log("Error: " + err);});

//     // Whats happening above?
//     // 1st of all we are destructuring the object
//     // then we are checking if all the fields are filled or not
//     // yes: then we return with error 422
//     // no: then we 1st check whether a same email id already exists o not
//     //         yes: we return
//     //         no: we save the user
// });

// **** Using Async Await ****
router.post('/register', async (req, res)=>{

    const {name, email, phone, work, password, cpassword} = req.body; // Destructuring the object

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Please fill all datafields!"});
    }

    try{
        const userExists = await User.findOne({email: email});  // returns a boolean value

        if(userExists){
            return res.status(422).json({error: "User already exists"});
        }

        const user = new User({name, email, phone, work, password, cpassword});  // es6 allows that if both  key & value have same names, then it 

        const userRegistered = await user.save();
        res.status(201).json({message: "user registered successfullly"});

    } catch(err){
        console.log("Error: " + err);
    }
});

//login route

router.post("/signin", async (req, res)=>{
    // console.log("Yeah ive been reached!");
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({error: "Please enter both the credentials!"});
    }

    try{
        const userExists = await User.findOne({email: email});
        
        if(userExists){
            // console.log(userExists);
            // if(userExists.password !== password){
            //     return res.status(401).json({error: "Invalid credentials!"}); 
            // }else{
            //     return res.status(200).json({message: "Welcome!"});
            // }
            const isMatch = await bcrypt.compare(password, userExists.password);

            if(!isMatch){
                 res.status(400).json({error: "Invalid Credentials"});
            }else{
                 res.status(400).json({message: "Successfully Logged In"});
            }
        }else{
             res.status(400).json({error: "No such user Exists"});
        }
    }catch(err){
        console.log("Error: " + err);
    }
});

module.exports = router;