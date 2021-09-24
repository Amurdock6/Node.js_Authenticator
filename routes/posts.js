const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');

router.get('/', verify, (req,res) => {
    res.json({posts: {
        title: 'Test', 
        description: 'should only be able to access with a JWT'}
    });
});

module.exports = router;