const jwt = require('jsonwebtoken');
<<<<<<< Updated upstream
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

module.exports = function (req,res,next){
          const token = req.cookies.auth_token;
          if (!token) {
            return res.status(403).send('Access Denied');
          }
          try {
            const data = jwt.verify(token, process.env.TOKEN_SECRET);
            req.userId = data.id;
            next();
          } catch(err) {
            return res.sendStatus(400).send('Invalid Token');
          }
  };
=======
const router = require('express')();
const cookieParser = require('cookie-parser');
const authRoute = require('./auth');
router.use(cookieParser());

module.exports = function(req,res,next){
    const token = jwt.verify(req.header('Cookie') && jwt.verify);
        if (!token) {
            return res.status(403).send('Access Denied');
        }
        try{
            const verified = token;
            req.user = verified;
            // const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            // req.user = verified;
             next();
        } catch (err) {
            res.clearHeader;
            res.status(403).send('Invalid Token');
        }
    };
>>>>>>> Stashed changes
