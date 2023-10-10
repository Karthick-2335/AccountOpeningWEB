class SIPBucket {
    Basketdetails = new Basketdetails();
    StockList = [];
}
class Basketdetails {
    ID;
    Base_Value;
    Basket_name;
    Nudgeline1;
    Nudgeline2;
    Onelinertext;
}
class StockList {
    Basket_id;
    stockName;
    scripid;
    price;
    qty;
    Imagepath;
    OriginalQty;
}
class SIPResponse {
    success;
    data;
    NoOfMonths = [6,12,24,46,60];
    selectMonth = 12;
    successMessage;
    errorMessage;
    errorcode;
}
class SIPRequest {
    SIPBucket = new SIPBucket();
    selectMonth;
}
module.exports = {
    SIPBucket : SIPBucket,
    StockList : StockList,
    SIPResponse : SIPResponse
}