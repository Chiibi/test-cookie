const express = require("express");
const path = require('path');
const serverless = require("serverless-http");
const cookieParser = require('cookie-parser');

const app = express();
const router = express.Router();

app.use(cookieParser());

router.get("/check", (req, res) => {
  res.send('Hello world check!')
});

router.get("/ios14", (req, res) => {
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('HereUrCookie',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
    res.send(`Cookie set ${cookie}`)
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
    res.send(`Cookie exists ${cookie}`)
  }
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);