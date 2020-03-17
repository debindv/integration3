const express = require('express');;
const router = express.Router();
const path = require('path');



router.get('/', (req,res) => {
   
  for (var i =0 ; i<2; i++){
 
    Election.methods.getCandidate(i)
      .call({ from: coinbase }).then((val) => {
        console.log(val);
        // val._id = web3.utils.toBN(val._id).toString();
        // val._name = web3.utils.toBN(val._name).toString();
        // for (var i = 1; i<=val._count; i++) {
        //   Election.methods.candidates(i)
        //     .call({ from: coinbase}).then((candidate) => {
        //       var id = candidate[0];
        //       var name = candidate[1];
        //       var voteCount = candidate[2];
        //     });
      });
    }

    console.log('hi');

    res.sendFile(path.join(__dirname,'../front-end','list.html'));
            
            //Render Candidate Result
      // }
     

});



module.exports = router;