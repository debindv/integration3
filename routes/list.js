const express = require('express');;
const router = express.Router();
const path = require('path');




router.get('/', (req,res) => {
  
  
  Election.methods.candidatesCount()
   .call({ from: coinbase }).then((count) => {

      for ( var i = 1; i <= count; i++ ) {
        Election.methods.getCandidate(i)
          .call({ from: coinbase }).then((val) => {
            val._id = web3.utils.toBN(val._id).toString();
            console.log(val._id,val._name);
          });
      }
    });

    res.sendFile(path.join(__dirname,'../front-end','list.html'));
     
            //Render Candidate Result
    
});



module.exports = router;