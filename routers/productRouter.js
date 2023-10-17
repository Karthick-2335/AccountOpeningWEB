const router = require('express').Router();
const { getSipDetails, postSipDetails } = require('../controllers/productController');

router.get('/', getSipDetails);
router.post('/', postSipDetails);

module.exports = router;