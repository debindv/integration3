const express = require('express');
var crypto = require('crypto');
const router = express.Router();
const path = require('path');
const Email = require('../models/Email');
const login = require('./login');
 
// To ensure authentication
 
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
   
    else{
      res.redirect('/login');
    }
   
  }
 
 
  var cid=[];
  var cname = [];
  var counter = 0;
 
//router.get('/',ensureAuthenticated, (req,res) => res.sendFile(path.join(__dirname,'../front-end','dashboard.html'))
 
 
router.get('/', ensureAuthenticated, (req,res) => {
  //Get Mail ID of the User
  //console.log(`email in dashboard = ${login.email}`);
  mailId = login.email;
  var mailHash = crypto.createHash('sha256').update(mailId).digest('hex');
  Election.methods.hasVoted(mailHash)
    .call({ from: coinbase}).then((cond) => {
      if(!cond) {
        Election.methods.candidatesCount()
          .call({ from: coinbase }).then((count) => {
            console.log(coinbase);
            for ( var i = 1; i <= count; i++ ) {
              Election.methods.getCandidate(i)
                .call({ from: coinbase }).then((val) => {
                  cid[counter] =  web3.utils.toBN(val._id).toString();
                  cname[counter] = val._name;
                  counter++;
                  //console.log(`data.id = ${cid}  and data.name = ${cname} `);
                  if(counter==count){
                    //console.log(`final cid = ${cid}  `);
                    counter = 0;
                    res.render('dashboard', {cid:cid, cname:cname});
                  }
              });
            }
          });
      }
      else {
        res.render('voted', {mailHash:mailHash});
      }
    });
});  


router.post('/', function(req, res, next) {
  var voteData = req.body.selectpicker;
  mailId = login.email;
  var mailHash = crypto.createHash('sha256').update(mailId).digest('hex');
  console.log(`HASH :${mailHash}`)
  //Pass Mail ID of the user along with voting Data
  Election.methods.vote(voteData, mailHash)
    .send({from: coinbase, gas:6000000}).catch((error) => {
      console.log(error);
    }).then(() => {
      res.render('success', {mailHash:mailHash});
    });
  //res.send('Succesfully Voted');
 
  Email.findOne({ voteData:voteData, mailHash:mailHash }).then(user => {
    if (user) {
      const newUser = new User({
        voteData,
        mailHash
      });
    }
    else {
      errors.push({ msg: 'Email details do not match' });
      res.render('dashboard', {
      errors,
      mailHash,
      voteData
   });
  }
  });
});






module.exports = router;