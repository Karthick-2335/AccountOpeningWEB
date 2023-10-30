const { profile } = require('../schemas/profileSchema');
const { Response } = require('./../model/responseModels');

const getProfile = async(req,res) => {
    try
    {
        const refno = req.params.referenceNumber;
        const getProfiledtl = await profile.find({referenceNumber : refno});
        if(getProfiledtl.length > 0)
        {
            res.send(new Response(true,'Profile details fetched successfully',getProfiledtl));
        }
        else
        {
            res.send(new Response(false,"Profile details not available",null));
        }
    }
    catch(err)
    {
        console.log(err);
        res.send(new Response(false,"Profile details not available",null));
    }
}

const postProfile = async(req,res) => {
    try
    {
        const profiledtl = req.body;
        console.log(profiledtl);
        const exist = await profile.find({referenceNumber : profiledtl.referenceNumber});
        if(exist.length > 0)
        {
            updateProfile(profiledtl);
            res.send(new Response(true,'Profile details updated successfully',null));
        }
        else
        {
            const postProfiledtl = await profile.create(profiledtl);
            const saveProfiledtl = await postProfiledtl.save();
            res.send(new Response(true,'Profile details inserted successfully',null));
        }
    }
    catch(err)
    {
        console.log(err);
        res.send(new Response(false,'Profile insertion was failed',null));
    }
}

async function updateProfile(updateProfiledtl)
{
    try
    {
        console.log(updateProfiledtl.referenceNumber);
        const upate = await profile.updateOne({referenceNumber : updateProfiledtl.referenceNumber},{
            $set : {
                title : updateProfiledtl.title,
                name : updateProfiledtl.name,
                email : updateProfiledtl.email,
                mobileNumber : updateProfiledtl.mobileNumber,
                martialStatus : updateProfiledtl.martialStatus,
                fatherName : updateProfiledtl.fatherName,
                occupation : updateProfiledtl.occupation,
                annualIncome : updateProfiledtl.annualIncome,
                tradingExperience : updateProfiledtl.tradingExperience,
                isNominee : updateProfiledtl.isNominee,
                nominee : updateProfiledtl.nominee
            }
        })
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {
    getProfile,
    postProfile
}