const nodemailer = require("nodemailer"); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthick2335@gmail.com',
        pass: 'bmqu suzh lhzm sdet'
    }
});

const sendotp = async (to,subject,html) => {
    try
    {
        let info = await transporter.sendMail({
            from: '"Karthick R" <karthick2335@gmail.com>',
            to: to,
            subject: subject,
            text: `${html}`,
          });
        console.log("Message sent: %s", info.messageId); // Output message ID
        console.log("View email: %s", nodemailer.getTestMessageUrl(info));
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {
    sendOTP : sendotp
}