const collection = require('../utilities/connection');
const sha256 = require('js-sha256').sha256;
let user = {}


//GenerateID function for denerating unique UserId
user.generateId = () => {
    return collection.getCollection().then((model) => {
        return model.aggregate([{
            $project: {
                "userId": 1,
                _id: 0
            }
        },
        {
            $sort: {
                "userId": -1
            }
        }, {
            $limit: 1
        }]).then((ids) => {
            let uId;
            if (ids.length > 0) {
                uId = Number(ids[0].userId.substr(1, ids[0].userId.length));
                uId += 1;
            } else {
                uId = 1000;
            }
            return String('U') + uId;
        })
    })
}

//function to find if user exists or not
user.findUser = (uEmail) => {
    return collection.getCollection().then(userColl => {
        return userColl.find({ "uCredentials.uEmail": uEmail }).then(data => {
            return data;
        })
    })
}


//function to execute registration
user.registerUser = (userData) => {
    console.log('In model')
    return collection.getCollection().then(userColl => {
        return user.findUser(userData.uCredentials.uEmail).then(data => {
            if (data.length === 0) {
                console.log("Register")
                return user.generateId().then(uid => {
                    userData.userId = uid;
                    return userColl.create(userData).then(insertedData => {
                        return { userId: insertedData.userId, uName: insertedData.uProfile.uName };
                    })
                })
            } else {
                console.log("No register")
                throw new Error('User with this E-mail is already Registered. Please login.')
            }
        })
    })
}

//function to execute login
user.userLogin = (uEmail, uPass) => {
    return collection.getCollection().then(userColl => {
        return user.findUser(uEmail).then(data => {
            if (data.length === 1) {
                //Password comparison
                const salt = data[0]['uCredentials']['salt'];
                uPass = sha256(salt + sha256(salt + sha256(uPass)));

                if (uPass == data[0]['uCredentials']['uPass']) {
                    return userColl.updateOne({ "uCredentials.uEmail": uEmail }, { $set: { "uProfile.uLastLogin": new Date().toISOString() } }).then(res => {
                        if (res.nModified === 1) {
                            return data[0].uProfile;
                        }
                    })
                } else {
                    throw new Error("The password entered is incorrect!!")
                }
            } else {
                throw new Error("You are not registered. Please register to login");
            }
        })
    })
}



module.exports = user;