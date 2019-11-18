let validator = {}

validator.validateName = (name) => {
    const nameRegex = /^[a-zA-Z][a-zA-Z ]+$/;
    if(!name.match(nameRegex)){
        let err = new Error('Name Can contain only alphabets and space');
        err.status = 406;
        throw err;
    }
}

validator.validatePhone = (number)=> {
    number = number.toString();
    const phoneRegex = /^[6-9][0-9]{9}$/;
    if(!number.match(phoneRegex)){
        let err = new Error('Please Enter Valid 10-digit Phone Number');
        err.status = 406;
        throw err;
    }
}

validator.validateEmail = (email) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(emailRegex)) {
        let err = new Error('Please enter valid Email');
        err.status = 406;
        throw err;
    }
}

validator.validatePassword = (password) => {
    if (password.length < 7 || password.length > 20) {
        let err = new Error('Password must be 7-20 characters long');
        err.status = 406;
        throw err;
    }
    // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@%^&*!$])/;
    // if(!password.match(passwordRegex)){
    //     let err = new Error("Password should contain at least one uppercase, at least one lowercase, at least one digit. It should also contain a special character amongst -!, @, #, $, %, ^, &, *");
    //     err.status = 406;
    //     throw err;
    // }
}

module.exports = validator;