const router = require('express').Router();
const {getIfscDetails,getBank,postBank} = require('./../controllers/bankController');

router.get('/getIfsc/:ifsc',getIfscDetails);
router.get('/:referenceNumber',getBank);
router.post('/',postBank);

module.exports = router;