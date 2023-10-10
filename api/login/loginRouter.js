const router = require('express').Router();
const { loginUsers, validateOtp } = require('./loginController');
try {
    router.post('/validate', validateOtp);

    router.post('/login', loginUsers);
}
catch (err) {
    console.log(err);
}

module.exports = router;