class SIPBucket {
    Basketdetails = new Basketdetails();
    NoOfMonths = [6,12,24,48,60];
    selectMonth = 12;
}
class Basketdetails {
    ID;
    Base_Value;
    Basket_name;
    Nudgeline1;
    Nudgeline2;
    Onelinertext;
    StockList = []
}
class StockList {
    Basket_id;
    stockName;
    scripid;
    price;
    totalPrice;
    qty;
    Imagepath;
    OriginalQty;
}

class SIPRequest {
    SIPBucket = new SIPBucket();
    selectMonth;
}
module.exports = {
    SIPBucket : SIPBucket,
    StockList : StockList,
    Basketdetails : Basketdetails
}