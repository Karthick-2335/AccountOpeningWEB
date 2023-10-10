const mongodb = require('mongoose');

const login = mongodb.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        default : Date.now
    },
    mobile : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    }
});

const otp = mongodb.Schema({
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    ip : {
        type : String,
        required : false
    },
    otpNumber : {
        type : String,
        required : true
    },
    triggeredOn : {
        type : Date,
        default : Date.now
    },
    authenticated : {
        type : Boolean,
        required : true
    },
    active : {
        type : String,
        default : 'Y'
    }
})

module.exports = {
    login : mongodb.model('login',login),
    otpVerification : mongodb.model('otpverification',otp)
}