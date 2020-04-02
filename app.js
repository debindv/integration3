const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
var Web3 = require("web3");

web3 = new Web3("http://localhost:8545");

const app = express();
app.set('view engine','ejs');

web3.eth.getCoinbase(function (err, account) {
	if(err === null) {
		coinbase = account;
	}
});
//coinbase = "0x9A8Bc6378253702e3Da5a96Cf467e89dEEb9bFE8";
var contractAddress = "0xf4E218Fad7A82c5F422bA585261685F61B3d6AE4";
const contractAbi = require('./contracts/contractAbi');




Election = new web3.eth.Contract(contractAbi, contractAddress);

// Passport Config
require('./config/passport')(passport);


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));





// Express body parser
app.use(express.urlencoded({ extended: true }));


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());




// For static front end
app.use(express.static('front-end'));

// Routes

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/list', require('./routes/list'));
app.use('/result', require('./routes/result'));





module.exports = app;


