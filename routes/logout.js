const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
 
 
router.get('/', (req,res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});
 

 
 
 
module.exports = router;