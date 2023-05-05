const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
    this.cpassword = await bcrypt.hash(this.cpassword, 5);
  }
  next();
});

//generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    // here we'll generate the token;
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);

    // now we need to add the above token to the userSchema
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token; // will be used in the auth.js section
  } catch (err) {
    console.log("Error: " + err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
