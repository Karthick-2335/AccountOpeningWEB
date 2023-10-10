const fs = require('fs');
const path = require('path');
const SipModel = require('../../model/sipModel');
const { SIP } = require('./sipSchema');

const getSipDetails = (req, res) => {
    const sipPath = path.join(__dirname, '../../', 'SIP_JSON.txt');
    console.log(sipPath);
    fs.readFile(sipPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(200).json({
                success: false,
                data: err
            });
        }
        else {
            let response = getBasketDetails(data)
            res.status(200).json({
                response: response
            });
        }
    })
}

const postSipDetails = async (req, res) => {
    try {
        const body = req.body;
        const postSIP = await new SIP({
            ID: body.data[0].ID,
            Base_Value: body.data[0].Base_Value,
            Basket_name: body.data[0].Basket_name,
            Nudgeline1: body.data[0].Nudgeline1,
            Nudgeline2: body.data[0].Nudgeline2,
            Onelinertext: body.data[0].Onelinertext,
            StockList: splitStockArray(body.data[0].StockList)
        });
        const saveSIP = await postSIP.save();
        res.status(200).json({
            success: true,
            data: 'Inserted successfully'
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: err
        });
    }
}

function splitStockArray(arr) {
    let StockList = [];
    arr.forEach(e => {
        const stockObj = new SipModel.StockList();
        stockObj.Basket_id = e.Basket_id;
        stockObj.Imagepath = e.Imagepath;
        stockObj.price = e.price;
        stockObj.qty = e.qty;
        stockObj.scripid = e.scripid;
        stockObj.stockName = e.stockName;
        stockObj.OriginalQty = e.OriginalQty;
        StockList.push(stockObj)
    });
    return StockList;
}

function getBasketDetails(data) {
    const obj = [];
    const apivalue = JSON.parse(data);
    apivalue.forEach(element => {
        const basket = new SipModel.SIPBucket();
        basket.Basketdetails.ID = element.Basketdetails.ID;
        basket.Basketdetails.Base_Value = element.Basketdetails.Base_Value;
        basket.Basketdetails.Basket_name = element.Basketdetails.Basket_name;
        basket.Basketdetails.Nudgeline1 = element.Basketdetails.Nudgeline1;
        basket.Basketdetails.Nudgeline2 = element.Basketdetails.Nudgeline2;
        basket.Basketdetails.Onelinertext = element.Basketdetails.Onelinertext;
        element.StockList.forEach(e => {
            const stockObj = new SipModel.StockList();
            stockObj.Basket_id = e.Basket_id;
            stockObj.Imagepath = e.Imagepath;
            stockObj.price = e.price;
            stockObj.qty = e.qty;
            stockObj.scripid = e.scripid;
            stockObj.stockName = e.stockName;
            stockObj.OriginalQty = e.qty;
            basket.StockList.push(stockObj);
        })
        obj.push(basket);
    });
    const response = new SipModel.SIPResponse();
    response.success = true;
    response.successMessage = "API Fetched SuccessFully";
    response.data = obj;
    return response;
}

module.exports = {
    getSipDetails: getSipDetails,
    postSipDetails: postSipDetails
}