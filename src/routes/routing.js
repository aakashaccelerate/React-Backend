const express = require('express');
const service = require('../service/userService');
const router = express.Router();


//REGISTER API
router.post('/register', (req, res, next) => {
    console.log('In routing')
    return service.registerUser(req.body).then(responseData => {
        res.json({ data: responseData });
    }).catch(err => {
        next(err);
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