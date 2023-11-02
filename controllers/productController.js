const fs = require('fs');
const path = require('path');
const {SIPBucket,Basketdetails,StockList} = require('./../model/productModel');
const {Response}= require('./../model/responseModels');
const { SIP } = require('./../schemas/productSchema');

const getSipDetails = async (req, res) => {
    const refno = req.params.referenceNumber;
    const sipPath = path.join(__dirname, '../SIP_JSON.txt');
    console.log(sipPath);
    fs.readFile(sipPath, 'utf8', async (err, data) => {
        if (err) {
            res.send(new Response(false,'Basketdetails fetch was failed',null));
        }
        else {
            console.log(refno);
            const productdtl = await getBasketDetails(data,refno);
            res.send(new Response(true,'Basketdetails fetched successfully',productdtl));
        }
    })
}

const postSipDetails = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        const exist = await SIP.find({referenceNumber : body.referenceNumber});
        const postSIP = await SIP.create(body[0])
        const saveSIP = await postSIP.save();
        res.send(new Response(true,'Basketdetails inserted successfully',saveSIP));
    }
    catch (err) {
        console.log(err);
        res.send(new Response(false,'Basketdetails insertion failed',null));
    }
}

async function getBasketDetails(data,refno) {
    const obj = [];
    const exist = await SIP.find({referenceNumber : refno});
    const basketResponse = new SIPBucket();
    let apivalue = JSON.parse(data);
    if(exist.length > 0)
    {
        apivalue =  exist;
        apivalue.forEach(element => {
            const basket = new Basketdetails();
            basket.ID = element.ID;
            basket.Base_Value = element.Base_Value;
            basket.Basket_name = element.Basket_name;
            basket.Nudgeline1 = element.Nudgeline1;
            basket.Nudgeline2 = element.Nudgeline2;
            basket.Onelinertext = element.Onelinertext;
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
            basketResponse.Basketdetails = obj;
            basketResponse.selectMonth = apivalue[0].SelectMonth;

        });
    }
    else
    {
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
            basketResponse.Basketdetails = obj;

        });
    }
        
    return basketResponse;
}

module.exports = {
    getSipDetails: getSipDetails,
    postSipDetails: postSipDetails
}