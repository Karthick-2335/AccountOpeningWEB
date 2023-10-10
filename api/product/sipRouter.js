const router = require('express').Router();
const { getSipDetails, postSipDetails } = require('./sipController');

router.get('/', getSipDetails);
router.post('/', postSipDetails);

module.exports = router;