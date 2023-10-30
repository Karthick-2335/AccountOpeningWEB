const { registration } = require('../schemas/registrationSchema');
const { Response } = require('./../model/responseModels');

const postRegistration = async (req,res) => {
    try 
    {
        const registrationdtl = req.body;
        console.log(registrationdtl);
        const exist = await registration.find({referenceNumber : registrationdtl.referenceNumber})
        console.log(exist);
        if(exist.length > 0)
        {
            updateRegistration(registrationdtl);
            res.send(new Response(true,'Updated successfully',null))
        }
        else
        {
            const postRegistrationdtl = await registration.create(registrationdtl);
            const saveRegistrationdtl = await postRegistrationdtl.save();
            res.send(new Response(true,'Registration details inserted successfully',null));
        }
        
    }
    catch(err)
    {
        console.log(err);
        res.send(new Response(false,'Registration details insertion Failed',null));
    }
}

const getRegistration = async (req,res) => {
    try 
    {
        const refNo = req.params.referenceNumber;
        console.log(refNo);
        const registrationdtl = await registration.find({referenceNumber : refNo});
        console.log(registrationdtl);
        if(registrationdtl.length > 0)
        {
            res.send(new Response(true,'Registration details fetched successfully',registrationdtl));
        }
        else
        {
            res.send(new Response(false,'Registration details fetch was failed',null));
        }
    }
    catch(err)
    {
        console.log(err);
        res.send(new Response(false,'Registration details fetch was failed',null));
    }
}
async function updateRegistration(updateData)
{
    try
    {
        const updRegistrationdtl = await registration.updateOne({referenceNumber : updateData.referenceNumber},{
            $set : {
                panNumber : updateData.panNumber,
                dateOfBirth : updateData.dateOfBirth,
                addressLine1 : updateData.addressLine1,
                addressLine2 : updateData.addressLine2,
                city : updateData.city,
                district : updateData.district,
                state : updateData.state,
                pinCode : updateData.pinCode
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
}
module.exports = {
    postRegistration,
    getRegistration
}