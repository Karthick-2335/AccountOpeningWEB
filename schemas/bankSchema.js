const mongodb = require('mongoose');

const bank = mongodb.Schema({
    accountType : {
        type : String,
        required : true
    },
    ifscCode : {
        type : String,
        required : true
    },
    bankAddress : {
        type : String,
        required : true
    },
    accountNumber : {
        type : String,
        required : true
    },
    referenceNumber : {
        type : String,
        required : true
    }
})

module.exports = {
    bank : mongodb.model('bank',bank)
}
