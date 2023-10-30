const router = require('express').Router();
const {getProfile,postProfile} = require('./../controllers/profileController');

router.get('/:referenceNumber',getProfile);
router.post('/',postProfile);

module.exports = router;