const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');

router.get('/', verify, (req,res) => {
    //Redirects you to welcome page after successful login
    res.redirect('/welcome');
});

module.exports = router;