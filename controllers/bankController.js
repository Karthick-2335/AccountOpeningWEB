const axios = require('axios'); 
const response = require('../model/responseModel');
const resp = new response();

const getIfscDetails = async (req,res) => {
    try
    {
        const ifsc = req.params.ifsc;
        console.log(ifsc);
        const config = 
        { 
            method: 'get', 
            url: `${process.env.IfscAPI + ifsc}` 
        } 
         
        let response = await axios(config);
        if(response.data.ADDRESS.length > 0)
        {
            resp.success = true;
            resp.successMessage = "IFSC Details fetched";
            resp.statusCode = 200;
            resp.results = response.data;
        }
        else
        {
            resp.success = false;
            resp.errorMessage = "We can't fetch the details against your IFSC. Please provide the valid IFSC";
            resp.statusCode = 404;
        }
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

module.exports = 
{
    getIfscDetails
}