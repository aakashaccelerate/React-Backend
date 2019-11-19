const express = require('express');
const service = require('../service/userService');
const router = express.Router();


//REGISTER API
router.post('/register', (req, res, next) => {
    return service.registerUser(req.body).then(responseData => {
        if(responseData)
        res.json({ data: responseData });
        else{
            console.log("error")
            res.send(null);
        }
     
    })
})

//LOGIN API
router.post('/login', (req, res, next) => {
    var uEmail = req.body.uEmail;
    var uPass = req.body.uPass;
    return service.loginUser(uEmail, uPass).then(item => {
        res.json({ data: item });
    }).catch(err => {
        next(err);
    });
})

module.exports = router;