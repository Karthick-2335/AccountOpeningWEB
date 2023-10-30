const fs = require('fs');
const path = require('path');
const {SIPBucket,Basketdetails,StockList} = require('./../model/productModel');
const {Response}= require('./../model/responseModels');
const { SIP } = require('./../schemas/productSchema');

const getSipDetails = (req, res) => {
    const sipPath = path.join(__dirname, '../SIP_JSON.txt');
    console.log(sipPath);
    fs.readFile(sipPath, 'utf8', (err, data) => {
        if (err) {
            res.send(new Response(false,'Basketdetails fetch was failed',null));
        }
        else {
            const basketResponse = new SIPBucket();
            basketResponse.Basketdetails = getBasketDetails(data)
            res.send(new Response(true,'Basketdetails fetched successfully',basketResponse));
        }
    })
}

const postSipDetails = async (req, res) => {
    try {
        const body = req.body;
        const postSIP = await new SIP({
            ID: body.Basketdetails[0].ID,
            Base_Value: body.Basketdetails[0].Base_Value,
            Basket_name: body.Basketdetails[0].Basket_name,
            Nudgeline1: body.Basketdetails[0].Nudgeline1,
            Nudgeline2: body.Basketdetails[0].Nudgeline2,
            Onelinertext: body.Basketdetails[0].Onelinertext,
            ReferenceNumber : body.referenceNumber,
            SelectMonth : body.selectMonth,
            StockList: splitStockArray(body.Basketdetails[0].StockList)
        });
        const saveSIP = await postSIP.save();
        res.send(new Response(true,'Basketdetails inserted successfully',saveSIP));
    }
    catch (err) {
        console.log(err);
        res.send(new Response(false,'Basketdetails insertion failed',null));
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
        const basket = new Basketdetails();
        basket.ID = element.Basketdetails.ID;
        basket.Base_Value = element.Basketdetails.Base_Value;
        basket.Basket_name = element.Basketdetails.Basket_name;
        basket.Nudgeline1 = element.Basketdetails.Nudgeline1;
        basket.Nudgeline2 = element.Basketdetails.Nudgeline2;
        basket.Onelinertext = element.Basketdetails.Onelinertext;
        element.StockList.forEach(e => {
            const stockObj = new StockList();
            stockObj.Basket_id = e.Basket_id;
            stockObj.Imagepath = e.Imagepath;
            stockObj.price = e.price;
            stockObj.qty = e.qty;
            stockObj.totalPrice = parseFloat(e.qty * e.price).toFixed(1);
            stockObj.scripid = e.scripid;
            stockObj.stockName = e.stockName;
            stockObj.OriginalQty = e.qty;
            basket.StockList.push(stockObj);
        })
        obj.push(basket);
    });
    
    return obj;
}

module.exports = {
    getSipDetails: getSipDetails,
    postSipDetails: postSipDetails
}