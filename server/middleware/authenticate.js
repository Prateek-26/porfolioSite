const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    console.log("In Middleware(MDW)");
    const tokenFromCookie = req.cookies.jwtoken;
    console.log(`token from cookies(MDW): ${tokenFromCookie}`);
    const verifiedToken = jwt.verify(tokenFromCookie, process.env.SECRET_KEY); //will return the contents of the token
    console.log(`deserialized token from cookie(MDW): \n ${verifiedToken}`);

    const rootUser = await User.findOne({
      _id: verifiedToken.signed_token_by_jwt,
      "tokens.token": tokenFromCookie,
    });
    // Now this rootUser is the one that actually logged in.
    // rootUser will now contain all the data about the user
    // console.log(`rootUser: ${rootUser}`);

    if (!rootUser) {
      console.log("No Such User Found!");
      throw new Error("User not found");
    }

    req.token = tokenFromCookie;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    console.log(req.rootUser);

    next();
  } catch (error) {
    console.log(`Error(MDW) - authenticate: ${error}`);
    res.status(401).send("Unauthorized Token Sent");
  }
};

module.exports = authenticate;
