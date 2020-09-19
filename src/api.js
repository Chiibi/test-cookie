const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const cookieParser = require('cookie-parser');
const fs = require('fs')
const pageTemplate = require('./index');

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
    res.cookie('HereUrCookie',randomNumber, { maxsAge: 900000, httpOnly: false });
    console.log('cookie created successfully');
    res.send(pageTemplate())
    // res.sendFile('/index.html', { root: path.join(process.cwd(), 'src') })
    
  } else {
    // yes, cookie was already present s
    console.log('cookie exists', cookie);
    res.send(pageTemplate())
    // res.sendFile('/index.html', { root: path.join(process.cwd(), 'src') })
  }
});

app.use(`/.netlify/functions/api`, router);

module.exports.handler = serverless(app);