const router = require('express').Router();
const {getIfscDetails} = require('./../controllers/bankController');

router.get('/:ifsc',getIfscDetails);

module.exports = router;