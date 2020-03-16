const express = require('express');;
const router = express.Router();
const path = require('path');

// To ensure authentication

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    else{
      res.redirect('/login');
    }
    
  }


router.get('/',ensureAuthenticated, (req,res) => res.sendFile(path.join(__dirname,'../front-end','dashboard.html')));

//Get Candidates

Election.methods.candidatesCount()
      .call({ from: coinbase }).then((val) => {
        val._count = web3.utils.toBN(val._count).toString();
        for (var i = 1; i<=val._count; i++) {
          Election.methods.candidates(i)
            .call({ from: coinbase}).then((candidate) => {
              var id = candidate[0];
              var name = candidate[1];
              var voteCount = candidate[2];
            });
            
            //Render Candidate Result
        }
      });

module.exports = router;