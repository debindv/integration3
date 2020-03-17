const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
var Web3 = require("web3");

web3 = new Web3("http://localhost:7545");

const app = express();

coinbase = "0x0746b306b201889498da9c69963f42d5b01f864f";
var contractAddress = "0xdbc7ff572a0c0697a53e97179a16b8dc9c81427f";
var contractAbi = [
  {
    "inputs":[],
    "stateMutability":"nonpayable",
    "type":"constructor"
  },
  {
    "inputs":[],
    "name":"candidate",
    "outputs":[
      {
       "internalType":"string",
        "name":"",
        "type":"string"
      }
    ],
    "stateMutability":"view",
    "type":"function"
  },
{
  "inputs":[
    {
      "internalType":"uint256",
      "name":"",
      "type":"uint256"
    }
  ],
  "name":"candidates",
  "outputs":[
    {
      "internalType":"uint256",
      "name":"id",
      "type":"uint256"
    },
    {
      "internalType":"string",
      "name":"name",
      "type":"string"
    },
    {
      "internalType":"uint256",
      "name":"voteCount",
      "type":"uint256"
    }
  ],
  "stateMutability":"view",
  "type":"function"
},
{
  "inputs":[],
  "name":"candidatesCount",
  "outputs":[
    {
      "internalType":"uint256",
      "name":"",
      "type":"uint256"
    }
  ],
  "stateMutability":"view","type":"function"},
  {
    "inputs":[
      {
        "internalType":"uint256",
        "name":"_candidateId",
        "type":"uint256"
      }
    ],
    "name":"getCandidate",
    "outputs":[
      {
        "internalType":"uint256",
        "name":"_id",
        "type":"uint256"
      },
      {
        "internalType":"string",
        "name":"_name",
        "type":"string"
      },
      {
        "internalType":"uint256",
        "name":"_voteCount",
        "type":"uint256"
      }
    ],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[
      {
        "internalType":"uint256",
        "name":"_candidateId",
        "type":"uint256"
      }
    ],
    "name":"vote",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[
      {
        "internalType":"address",
        "name":"",
        "type":"address"
      }
    ],
    "name":"voters",
    "outputs":[
      {
        "internalType":"bool",
        "name":"",
        "type":"bool"
      }
    ],
    "stateMutability":"view",
    "type":"function"
  }
];




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





module.exports = app;

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));
