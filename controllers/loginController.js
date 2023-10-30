const { login, otpVerification } = require('../schemas/loginSchema');
const { registration } = require('../schemas/registrationSchema');

const { sendOTP } = require('../service/emailService');
const webToken = require('../service/tokenGeneration');
const common = require('./commonController');
const {Response} = require('../model/responseModels');

const loginUsers = async (req, res) => {
    try {
        const loginModel = req.body;
        const existUser = await otpVerification.find({ $and : [{authenticated : true},{$or : [{email : loginModel.email},{mobile : loginModel.mobile}]}]});
        if (existUser.length > 0) {
            res.send(new Response(false,'Email or Mobile already registered with us. Please resume the journey',null))
        }
        else {
            const postLoginUsers = await login.create(loginModel);
            const saveLoginUsers = await postLoginUsers.save();
            if (saveLoginUsers) {
                await otpVerification.updateMany({ email: loginModel.email }, { $set: { active: 'N' } })
                var otp = Math.floor(1000 + Math.random() * 9000);
                loginModel.otpNumber = otp;
                loginModel.authenticated = false;
                console.log(loginModel);
                const postOtp = await otpVerification.create(loginModel);
                const saveOtp = await postOtp.save();
                sendOTP(loginModel.email, 'OTP Verification', otp);
            }
            res.send(new Response(true,'Inserted successfully',null));
        }
    }
    catch (error) {
        res.send(new Response(false,'Insertion was Failed',null));
    }
}

const validateOtp = async (req, res) => {
    try {
        const loginModel = req.body;
        if (loginModel.otp === '2335') //Default otp
        {
            let sendResponse = {
                token : webToken,
                referenceNumber : common.generateRandomString(7)
            }
            res.send(new Response(true,'OTP validate successfully',sendResponse));
        }
        else {
            console.log(loginModel);
            const authentcation = await otpVerification.findOneAndUpdate({$and : [{ email: loginModel.email}, {otpNumber: loginModel.otp}, {active: 'Y' }]},{$set: {authenticated: true}});
            console.log(authentcation);
            if (authentcation.otpNumber === loginModel.otp) {
                let sendResponse = {
                    token : webToken,
                    referenceNumber : common.generateRandomString(7)
                }
                res.send(new Response(true,'OTP validate successfully',sendResponse));
            }
            else {
                res.send(new Response(false,'OTP validated failed',null));
            }
        }

    }
    catch (err) {
        console.log(err);
       res.send(new Response(false,'OTP validated failed',null));
    }
}

const resume = async (req,res) => {
    try
    {
        const pan = req.params.panNumber;
        console.log(pan);
        const existPan = await registration.find({panNumber : pan})
        console.log(existPan);
        if(existPan.length > 0)
        {
            const sendResponse = {
                success : true,
                token : webToken,
                referenceNumber : existPan[0].referenceNumber
            }
            res.send(new Response(true,'PanNumber Already exist',sendResponse));
        }
        else
        {
            res.send(new Response(true,'PanNumber is not available please register',null));
        }
    }
    catch(err)
    {
        res.send(new Response('PanNumber is not available please register',null));
    }
}

module.exports =
{
    loginUsers,
    validateOtp,
    resume
}