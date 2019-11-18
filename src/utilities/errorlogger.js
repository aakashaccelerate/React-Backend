//import neccessary modules
const fs = require('fs');
let errorLogger =  (err, req, res, next) =>{
    //your implementation goes here
    if (err) {
        fs.appendFile('ErrorLogger.txt', new Date() + " : " + err.stack + "\n", (error) => {
            if (error) {
                console.log("Failed in logging error");
            }

        });
        if (err.status) {
            res.status(err.status);
        } else {
            res.status(500);
        }
        res.json({
            "message": err.message
        });
    } 
    else {
        console.log('Failed in logging error');
    }
    next();
}

module.exports = errorLogger;