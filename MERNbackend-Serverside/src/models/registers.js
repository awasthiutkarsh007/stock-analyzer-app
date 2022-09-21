const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const encrypt =  require('mongoose-encryption');
require('dotenv').config();
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required : true
  },
  email : { type: String},
  password: {
    type: String,
    required:true
  },
  tokens:[
    {
      token: {
        type: String,
        required: true

      }

  }
]
})

userSchema.plugin(passportLocalMongoose);
const secret='Thisisourlittlesecrert';
userSchema.plugin(encrypt,{ secret: secret, encryptedFields: ['password'] });
const Investor = new mongoose.model("Investor",userSchema);
passport.use(Investor.createStrategy());
passport.serializeUser(Investor.serializeUser());
passport.deserializeUser(Investor.deserializeUser());
// const InvestorProfile = new mongoose.model("InvestorProfile",userProfileSchema);
// Genearting Token
userSchema.methods.generateAuthToken = async function (){
  try{
    let token1 = jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token: token1});
    await this.save();
    return token;
  }catch(err){
    console.log(err)

  }
}
module.exports = Investor;


