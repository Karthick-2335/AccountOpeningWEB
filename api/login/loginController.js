const {login,otpVerification} = require('./loginSchema');
const {sendOTP} = require('./../../service/emailService');

const loginUsers = async (req,res) => {
    try
    {
        const body = req.body;
        console.log(body);
        const existUser = await otpVerification.find({email : body.email,authenticated:true});
        console.log(existUser);
        if(existUser.length > 0)
        {
            res.status(200).json({
                success : false,
                message : 'You are already registered with us please resume the journey'
            });
        }
        else
        {
            const postLoginUsers = await new login({
                fullName : body.fullName,
                email : body.email,
                mobile : body.mobile,
                gender : body.gender
            });
            const saveLoginUsers = await postLoginUsers.save();
            if(saveLoginUsers)
            {
               await otpVerification.updateMany({email:body.email},{$set:{active:'N'}})
                var otp = Math.floor(1000 + Math.random() * 9000);
                const postOtp = await new otpVerification({
                    email : body.email,
                    mobile : body.mobile,
                    ip : '',
                    otpNumber : otp,
                    authenticated : false
                });
                const saveOtp = await postOtp.save();
                sendOTP(body.email,'OTP Verification',otp);
            }
            res.status(200).json({
                success : true,
                message : 'Inserted successfully'
            });
        }
        
    }
    catch(error)
    {
        console.log(error);
        res.json({
            success : false,
            message : error
        });
    }
}

const validateOtp = async (req,res) => {
    try
    {
        const body = req.body;
        if(body.otp === '2335') //Default otp
        {
            res.json({
                success : true,
                message : 'Otp Valiated Successfully'
            });
        }
        else
        {
            const authentcation = await otpVerification.find({email : body.email,otpNumber:body.otp,active:'Y'});
            if(authentcation.length > 0)
            {
                await otpVerification.updateOne({email:body.email},{$set:{authenticated:true}})
                res.json({
                    success : true,
                    message : 'Otp Valiated Successfully'
                });
            }
            else
            {
                res.json({
                    success : false,
                    message : 'Otp Valiated Failed'
                });
            }
        }
        
    }
    catch(err)
    {
        console.log(err);
        res.json({
            success : false,
            message : err
        });
    }
}

module.exports = {
    loginUsers : loginUsers,
    validateOtp : validateOtp
}