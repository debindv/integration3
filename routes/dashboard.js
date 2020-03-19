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
 
 
  var cid=[];
  var cname = [];
  var counter = 0;
 
//router.get('/',ensureAuthenticated, (req,res) => res.sendFile(path.join(__dirname,'../front-end','dashboard.html'))
 
 
  router.get('/', (req,res) => {
    Election.methods.candidatesCount()
     .call({ from: coinbase }).then((count) => {
 
        for ( var i = 1; i <= count; i++ ) {
          Election.methods.getCandidate(i)
            .call({ from: coinbase }).then((val) => {
              cid[counter] =  web3.utils.toBN(val._id).toString();
              cname[counter] = val._name;
              counter++;
              //console.log(`data.id = ${cid}  and data.name = ${cname} `);
              if(counter==count){
                //console.log(`final cid = ${cid}  `);
                res.render('dashboard', {cid:cid, cname:cname});
              }
             
            });
        }
      });
  });   
 
router.post('/', function(req, res, next) {
  var voteData = req.body.selectpicker;
  console.log('Candidate voted is : ', voteData);
  Election.methods.vote(voteData)
    .send({from: coinbase, gas:6000000}).catch((error) => {
      console.log(error);
    }).then(() => {
      res.redirect('/login');
    });
  //res.send('Succesfully Voted');
  
});
         
 
   
 
 
 
 
 
 
module.exports = router;