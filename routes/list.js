const express = require('express');;
const router = express.Router();
const path = require('path');



router.get('/', (req,res) => {
    
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

    console.log('hi');

    res.sendFile(path.join(__dirname,'../front-end','list.html'));
            
            //Render Candidate Result
        }
      });

});



module.exports = router;