const express = require("express");
const app = express();
const path = require("path");
require('./db/connect');
const Register = require("./models/registers");
const Profile = require("./models/profileDb");
const port = process.env.port || 5000;
// const hbs = require("hbs");
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');

const register = require('./routes');
const login = require('./routes');
const profile = require('./routes');
const marketData = require('./routes');
const cors = require('cors');
const router = require("./routes");
const fs = require('fs'); 
const csv = require('csv-parser');

// const static_path = path.join(__dirname, "../public");
// const template_path = path.join(__dirname, "../templates/views");
// const partials_path = path.join(__dirname, "../templates/partials");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser('secret'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/',register);
app.use('/',login);
app.use('/',profile);
app.use('/',marketData);



app.listen(5000, function(req, res) {
  console.log('server is running at port no. 5000');
})
