const router = require('express').Router();
const { getSipDetails, postSipDetails } = require('../controllers/productController');

router.get('/:referenceNumber', getSipDetails);
router.post('/', postSipDetails);

module.exports = router;