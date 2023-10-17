const router = require('express').Router();
const {getAddressByPincode} = require('./../controllers/commonController');

router.get('/getAddressByPincode/:pincode',getAddressByPincode);

module.exports = router;