const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    console.log("Intoo Middleware");
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, SECRET_KEY);
    console.log(verifyToken); // Will give you the user_id

    const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});

    if(!rootUser){
        throw new Error('User not found')
    }

    // req.token = token;
    // req.rootUser = rootUser;
    // req.userID = rootUser._id;

    next();

  } catch (error) {
    res.status(401).send("Unauthorized Token Sent");
    console.log(`Error from middleware - authenticate: ${error}`);
  }

  
};

module.exports = authenticate;
