const dbLayer = require('../model/user');
const validator = require('../utilities/validator');
let user = {}

user.registerUser = (userData) => {
    console.log('In service')
    //Validators for Field Validations
    validator.validateName(userData.uProfile.uName);
    validator.validatePhone(userData.uProfile.uPhone);
    validator.validateEmail(userData.uCredentials.uEmail);
    validator.validatePassword(userData.uCredentials.uPass);
    //Encryption for storing Passwords
    const sha256 = require('js-sha256').sha256;
    const salt = sha256(Math.floor(Math.random() * 100000000).toString()).substring(0, 9);
    const password = sha256(salt + sha256(salt + sha256(userData.uCredentials.uPass)));
    userData.uCredentials.salt = salt;
    userData.uCredentials.uPass = password;
    return dbLayer.registerUser(userData).then(response => {
        if (response)
            return response;
        else {
            // let err = new Error('Registration Failed');
            // err.status = 500;
            // throw err;
            return null;
        }
    })
}

user.loginUser = (uEmail, pass) => {
    validator.validateEmail(uEmail);
    validator.validatePassword(pass);
    return dbLayer.userLogin(uEmail, pass).then(response => {
        if (response)
            return response;
        else {
            let err = new Error('Login Failed');
            err.status = 500;
            throw err;
        }
    })
}

module.exports = user;