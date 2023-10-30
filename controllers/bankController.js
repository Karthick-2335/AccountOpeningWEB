const axios = require('axios'); 
const {bank} = require('./../schemas/bankSchema')
const {Response} = require('../model/responseModels');

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
            res.send(new Response(true,'IFSC Details fetched',response.data));
        }
        else
        {
            res.send(new Response(false,"We can't fetch the details against your IFSC. Please provide the valid IFSC",null))
        }
        res.send(resp);
    }
    catch(error)
    {
        res.send(new Response(false,"We can't fetch the details against your IFSC. Please provide the valid IFSC",null))
    }
}

const getBank = async(req,res) => {
    try
    {
        const refno = req.params.referenceNumber;
        const getBankdtl = await bank.find({referenceNumber : refno});
        if(getBankdtl.length > 0)
        {
            res.send(new Response(true,'Bank details fetched successfully',getBankdtl));
        }
        else
        {
            res.send(new Response(false,'Bank details fetch was failed',null));
        }
    }
    catch(err)
    {
        console.log(err);
        res.send(new Response(false,'Bank details fetch was failed',null));
    }
}

const postBank = async(req,res) => {
    try
    {
        const bankdtl = req.body;
        console.log(bankdtl);
        const exist = await bank.find({referenceNumber : bankdtl.referenceNumber});
        if(exist.length > 0)
        {
            updateBank(bankdtl);
            res.send(new Response(true,'Bank details updated successfully',null));
        }
        else
        {
            const postbankdtl = await bank.create(bankdtl);
            const savebankdtl = await postbankdtl.save();
            res.send(new Response(true,'Bank details inserted successfully',null));
        }
        
    }
    catch(err)
    {
        console.log(err);
        res.send(new Response(true,'Bank details insertion failed',null));
    }
}

async function updateBank(updateData)
{
    try
    {
        const update = await bank.updateOne({referenceNumber : updateData.referenceNumber},{
            $set : {
                accountType : updateData.accountType,
                ifscCode : updateData.ifscCode,
                bankAddress : updateData.bankAddress,
                accountNumber : updateData.accountNumber
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = 
{
    getIfscDetails,
    getBank,
    postBank
}