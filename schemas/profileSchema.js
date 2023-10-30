const mongodb = require('mongoose');

const profile = mongodb.Schema({
    title : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        default : Date.now
    },
    martialStatus : {
        type : String,
        required : true
    },
    fatherName : {
        type : String,
        required : true
    },
    occupation : {
        type : String,
        required : true
    },
    annualIncome : {
        type : String,
        required : true
    },
    tradingExperience : {
        type : String,
        required : true
    },
    isNominee : {
        type : Boolean,
        required : true
    },
    nominee : {
        nomineeFirstName : {
            type : String,
            required : false
        },
        nomineeLastName : {
            type : String,
            required : false
        },
        nomineeDateOfBirth : {
            type : String,
            required : false
        },
        nomineeRelationShip : {
            type : String,
            required : false
        },
        nomineeIdProof : {
            type : String,
            required : false
        },
        nomineeIdProofNumber : {
            type : String,
            required : false
        }
    },
    referenceNumber : {
        type : String,
        required : true
    }
})

module.exports = {
    profile : mongodb.model('profile',profile)
}