const router = require('express').Router();
const { loginUsers, validateOtp, resume } = require('../controllers/loginController');

router.post('/validate', validateOtp);
router.post('/login', loginUsers);
router.get('/resume/:panNumber', resume);


module.exports = router;