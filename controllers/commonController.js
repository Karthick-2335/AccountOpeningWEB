const axios = require('axios'); 
const response = require('../model/responseModel');
const resp = new response();

function generateRandomString(n) {
    let randomString           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( let i = 0; i < n; i++ ) {
      randomString += characters.charAt(Math.floor(Math.random()*characters.length));
   }
   return randomString.toUpperCase();
}

const getAddressByPincode = async(req,res) => {
    try
    {
        const pincode = req.params.pincode;
        console.log(pincode);
        const config = 
        { 
            method: 'get', 
            url: `${process.env.AddressAPI + pincode}` 
        } 
         
        let response = await axios(config);
        resp.success = true;
        resp.successMessage = "Address Details fetched";
        resp.statusCode = 200;
        resp.results = response.data[0].PostOffice;
        res.send(resp);
    }
    catch(error)
    {
       resp.success = false;
       resp.errorMessage = error;
       resp.statusCode = 300;
       res.send(resp)
    }
}

module.exports = {
    generateRandomString,
    getAddressByPincode
}