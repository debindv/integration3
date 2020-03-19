// const express = require('express');;
// const router = express.Router();
// const path = require('path');

// // To ensure authentication

// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
    
//     else{
//       res.redirect('/login');
//     }
    
//   }


// router.get('/',ensureAuthenticated, (req,res) => res.sendFile(path.join(__dirname,'../front-end','dashboard.html')));

// //Get Candidates



// module.exports = router;


//JAADOO SECTION BELOW


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
        console.log(`count = ${count} `);
        for ( var i = 1; i <= count; i++ ) {
          Election.methods.getCandidate(i)
            .call({ from: coinbase }).then((val) => {
              cid[counter] =  web3.utils.toBN(val._id).toString();
              cname[counter] = val._name;
              counter++;
              console.log(`data.id = ${cid}  and data.name = ${cname} `);
             
             
            }).then((cid) => {
              console.log(`cid = ${cid}  `);
            });
        }
      });
      
      
      //((cid) => console.log(`cid = ${cid}  `));
     
 
      //res.render('dashboard', {cid:cid})
         
 
   });
 
 
//Get Candidates
 
 
 
module.exports = router;
 
 
 
    // res.render('dashboard', {val: 'Peter'})