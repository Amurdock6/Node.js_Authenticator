const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');
const { redirect } = require('express/lib/response');

//Register New User
router.post('/register', async (req,res) => {

    //Validate the data before creating user
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if user already exist in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password for secruity
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    res.redirect('/login')
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//Login
router.post('/login', async (req,res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if eamil exist in database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password does not exists');

    //Check if password is correct
    const validPass= await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')
    
    //Creat and assign json web token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: "1h" });

    res.cookie('auth-token', token, {
        httpOnly: true
        // secure: false,
        // maxAge: 1000000,
        //signed: true,
    });

    //res.header('auth-token', token);
    //Redirects you to welcome page after successful login
    res.redirect('/welcome');
});

module.exports = router;