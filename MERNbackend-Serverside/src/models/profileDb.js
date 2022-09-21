const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required : true
    },
    last_name:{
      type: String,
      required: true
    },
    email : { type: String},
    mobile: {
      type: Number,
      required:true
    }
  })

  const InvestorProfile = new mongoose.model("InvestorProfile",userProfileSchema);
  module.exports = InvestorProfile;
