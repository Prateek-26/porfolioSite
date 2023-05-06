const { Router } = require("express");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate")
const router = express.Router();

require("../db/conn");
const User = require("../model/userSchema");

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

// **** SIGNUP ****

router.post("/signup", async (req, res) => {
  console.log(req.body);

  const { name, email, phone, work, password, cpassword } = req.body.user; // Destructuring the object

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill all datafields!" });
  }

  try {
    const userExists = await User.findOne({ email: email }); // returns a boolean value

    if (userExists) {
      console.log("User exists");
      return res.status(422).json({ error: "User already exists" });
    }

    const user = new User({ name, email, phone, work, password, cpassword }); // es6 allows that if both  key & value have same names, then it

    const userRegistered = await user.save();
    console.log("New User");
    res.status(201).json({
      message: "user registered successfullly",
      userSaved: userRegistered,
    });
  } catch (err) {
    console.log("Error: " + err);
  }
});

// **** SIGNIN ****

router.post("/signin", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body.userkey;

  if (!email || !password) {
    console.log("provide all details");
    return res
      .status(400)
      .json({ error: "Please enter both the credentials!" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    // console.log(userExists);

    // Returns the user details.

    if (userExists) {
      const isMatch = await bcrypt.compare(password, userExists.password); // returns a bool value

      console.log(`is match: ${isMatch}`);

      const token = await userExists.generateAuthToken(); // here we are giving a function call to the methods of userExist ( or to be more specific, the Schema on which userExists is build on);
      console.log(token);

      //storing token inside the cookie
      res.cookie("jwtoken", token, {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(new Date().getTime() + 5000 * 1000), // Can tweak this
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
        console.log("invalidddd");
      } else {
        res.status(200).json({
          message: "Successfully Logged In",
          token: token,
          loggedUser: userExists,
        });
        console.log("Successfull");
      }
    } else {
      console.log("No such user Exists");
      res.status(400).json({ error: "No such user Exists" });
    }
  } catch (err) {
    console.log("Error: " + err);
  }
});

router.get('/about', authenticate, (req, res)=>{
console.log("Into about");
})

module.exports = router;
