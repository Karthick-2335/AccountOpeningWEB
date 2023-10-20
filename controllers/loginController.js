const { login, otpVerification } = require('../schemas/loginSchema');
const { sendOTP } = require('../service/emailService');
const webToken = require('../service/tokenGeneration');
const response = require('../model/responseModel');
const common = require('./commonController');
const resp = new response();
const loginUsers = async (req, res) => {
    try {
        const loginModel = req.body;
        const existUser = await otpVerification.find({ $and : [{authenticated : true},{$or : [{email : loginModel.email},{mobile : loginModel.mobile}]}]});
        if (existUser.length > 0) {
            resp.success = false;
            resp.errorMessage = "Email or Mobile already registered with us. Please resume the journey";
            resp.statusCode = 200;
            res.send(resp)
        }
        else {
            const postLoginUsers = await login.create(loginModel);
            const saveLoginUsers = await postLoginUsers.save();
            if (saveLoginUsers) {
                await otpVerification.updateMany({ email: loginModel.email }, { $set: { active: 'N' } })
                var otp = Math.floor(1000 + Math.random() * 9000);
                loginModel.otpNumber = otp;
                loginModel.authenticated = false;
                const postOtp = await otpVerification.create(loginModel);
                const saveOtp = await postOtp.save();
                sendOTP(loginModel.email, 'OTP Verification', otp);
            }
            resp.success = true;
            resp.successMessage = "Inserted successfully";
            resp.statusCode = 200;
            res.send(resp);
        }
    }
    catch (error) {
        console.log(error);
        resp.success = false;
        resp.error = true;
        resp.errorMessage = error;
        resp.statusCode = 300;
        res.send(resp);
    }
}

const validateOtp = async (req, res) => {
    try {
        const loginModel = req.body;
        if (loginModel.otp === '2335') //Default otp
        {
            resp.success = true;
            resp.successMessage = "OTP validate successfully";
            resp.token = webToken;
            resp.statusCode = 200;
            resp.referenceNumber = common.generateRandomString(7)
            res.send(resp);
        }
        else {
            const authentcation = await otpVerification.findOneAndUpdate({$and : [{ email: loginModel.email}, {otpNumber: loginModel.otp}, {active: 'Y' }]},{$set: {authenticated: true}});
            if (authentcation.length > 0) {
                resp.success = true;
                resp.successMessage = "OTP validated successfully";
                resp.token = webToken;
                resp.statusCode = 200;
                res.send(resp);
            }
            else {
                resp.success = false;
                resp.error = true;
                resp.errorMessage = "OTP validated failed";
                resp.statusCode = 200;
                res.send(resp);
            }
        }

    }
    catch (err) {
        resp.success = false;
        resp.error = true;
        resp.errorMessage = err;
        resp.statusCode = 300;
        res.send(resp);
    }
}

const resume = (req,res) => {
    try
    {
        const panNumber = req.params.panNumber;
        console.log(panNumber);
        resp.success = true;
        res.send(resp)
    }
    catch(err)
    {
        resp.success = false;
        resp.error = true;
        resp.errorMessage = err;
        resp.statusCode = 300;
        res.send(resp);
    }
}

module.exports =
{
    loginUsers,
    validateOtp,
    resume
}