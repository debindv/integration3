const express = require('express');;
const router = express.Router();
const path = require('path');



router.get('/', (req,res) => {
   
  for (var i = 1 ; i < 3; i++){
 
    Election.methods.getCandidate(i)
      .call({ from: web3.eth.accounts[1] }).then((val) => {
        //console.log(val);
        val._id = web3.utils.toBN(val._id).toString();
        console.log(val._id,val._name);
      });
    }

    console.log('hi');

    res.sendFile(path.join(__dirname,'../front-end','list.html'));
            
            //Render Candidate Result
      // }
     

});



module.exports = router;