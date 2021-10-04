const jwt = require('jsonwebtoken');
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