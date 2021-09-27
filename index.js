const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const res = require('express/lib/response');
const { verify } = require('jsonwebtoken');
const verifyJsonWebToken = require('./routes/verifyToken');
const { cookie } = require('express/lib/response');


dotenv.config();

//Set views
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false }))


app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/login', (req, res) => {
    res.render('login.ejs')
});

app.get('/register', (req, res) => {
    res.render('register.ejs')
});

app.get('/welcome', verifyJsonWebToken, (req, res) => {
    res.render('welcome.ejs', { username: 'Alex'})
});

//Sends From Info to database
app.post('/register', authRoute);
app.post('/login', authRoute);


//Adds css to pages
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
() => console.log('connected to db!')
);

//Middleware
app.use(cookieParser());
app.use(express.json());
//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server Up and Running'));