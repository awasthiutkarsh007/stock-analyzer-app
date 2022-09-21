const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/InvestorInfo",{
  useNewUrlParser: true,
}).then(()=>{
  console.log("connection sucessfull");
}).catch((e)=>{
  console.log('no connection')
})


