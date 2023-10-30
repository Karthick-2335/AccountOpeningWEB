const mongodb = require('mongoose');

const createBasket = mongodb.Schema({
    ID: {
        type: Number,
        required: true
    },
    Base_Value: {
        type: Number,
        required: true
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    Basket_name: {
        type: String,
        required: true
    },
    Nudgeline1: {
        type: String,
        required: true
    },
    Nudgeline2: {
        type: String,
        required: true
    },
    Onelinertext: {
        type: String,
        required: true
    },
    ReferenceNumber : {
        type : String,
        required : true
    },
    SelectMonth : {
        type : String,
        required : true
    },
    StockList: [{
        Basket_id: {
            type: Number,
            required: true
        },
        stockName: {
            type: String,
            required: true
        },
        scripid: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        Imagepath: {
            type: String,
            required: true
        },
        OriginalQty: {
            type: Number,
            required: true
        }
    }]
});

module.exports = {
    SIP: mongodb.model('sipInfo', createBasket)
}