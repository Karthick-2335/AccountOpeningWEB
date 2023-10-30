const mongodb = require('mongoose');

const registration = mongodb.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    panNumber : {
        type : String,
        required : false
    },
    dateOfBirth : {
        type : String,
        required : false
    },
    addressLine1 : {
        type : String,
        required : false
    },
    addressLine2 : {
        type : String,
        required : false
    },
    city : {
        type : String,
        required : false
    },
    district : {
        type : String,
        required : false
    },
    state : {
        type : String,
        required : false
    },
    pinCode : {
        type : String,
        required : false
    },
    createdOn : {
        type : Date,
        default : Date.Now
    },
    referenceNumber : {
        type : String,
        required : true
    }
})

module.exports = {
    registration : mongodb.model('registration',registration)
}