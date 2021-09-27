const jwt = require('jsonwebtoken');
const router = require('express')();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
module.exports = function(req,res,next){
        const token = req.header('Cookie');
        if (!token) {
            return res.status(403).send('Access Denied');
        }
        try{
            const verified = req.header('Cookie');
            req.user = verified;
            // const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            // req.user = verified;
             next();
        } catch (err) {
            res.clearHeader;
            res.status(403).send('Invalid Token');
        }
    };