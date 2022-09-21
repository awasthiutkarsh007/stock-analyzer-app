const express = require("express");
const passport = require("passport");
const Investor = require("./models/registers");
const InvestorProfile = require("./models/profileDb");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const Register = require("./models/registers");
const fs = require('fs'); 
const csv = require('csv-parser');



router.post("/register", async (req, res) => {
    try {
      const registerUser = new Investor({
        username: req.body.fullname,
        email: req.body.email,
        password: req.body.password
      })
      console.log(registerUser.email);
      const mail = req.body.email;
      console.log(mail);
      const usedmail = await Investor.findOne({
      email: mail
    });
    console.log(usedmail);
    if (usedmail && usedmail.email == mail) {
      res.send('User already registered')
    }
    else{
        console.log('HELLO');
        await registerUser.save();
        res.send('User registered succesfullly');

    }
} catch (error) {
    console.log(error)
  }
});
router.post("/profile", async (req, res) => {
  try {
    const registerUserProfile = new InvestorProfile({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      mobile: req.body.mobile,
      
    })
    await registerUserProfile.save();
     res.send('Changes saved succesfullly');
} catch (error) {
  console.log(error)
}
});


router.post("/", async (req, res) => {
    try{
        let token;
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Investor.findOne({
        email: email
    });
    if (useremail && useremail.password == password) {

            res.send('Logged In succesfully');
            token = await useremail.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken" ,token,{
              expires: new Date(Date.now()+1000),
              httpOnly:true

            });
        } else {
            res.send('Wrong Email/Password');
          }
    }
    catch(error) {
          res.send('You are not registered')
    }
    
});







// router.get('/', (req, res) => {
//   // const { country, category } = req.query;
//   // axios.get(`http://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${config.apiKey}`)
//   axios.get('www1.nseindia.com/content/historical/EQUITIES/2021/OCT/cm21OCT2021bhav.csv.zip')    
//   .then(response => {
//           res.send(response.data);
//       })
//       .catch(error => {
//           console.log(error);
//       });
// });

module.exports = router;