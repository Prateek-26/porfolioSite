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
  // added the below two when was handling contact form
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
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
      message: {
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
    // token_id, justForFunId these cd be named anything! and is what the token will contain, with an automatic addition of _id
    let signedToken = jwt.sign(
      { signed_tokenid_by_jwt: this._id, justForFunId: "FunID" },
      process.env.SECRET_KEY
    );
    console.log("Token Created By generateAuthToken Method: " + signedToken);
    // now we need to add the above token to the userSchema
    this.tokens = this.tokens.concat({ token: signedToken });
    await this.save();

    return signedToken; // will be used in the auth.js section
  } catch (err) {
    console.log("Error: " + err);
  }
};

userSchema.methods.addMessage = async function(name, email, phone, message){
  console.log("Inside the addMessage");
  try {
    this.messages = this.messages.concat({name, email, phone, message})
    console.log(this.messages);
    await this.save();
    return this.messages;
  } catch (error) {
    console.log("Error inside addMessage method: ");
    console.log(error);
  }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
