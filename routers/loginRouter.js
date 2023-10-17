const router = require('express').Router();
const { loginUsers, validateOtp } = require('../controllers/loginController');

router.post('/validate', validateOtp);
router.post('/login', loginUsers);

module.exports = router;