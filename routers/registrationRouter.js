const router = require('express').Router();
const {getRegistration,postRegistration} = require('./../controllers/registrationController');

router.get('/:referenceNumber',getRegistration);
router.post('/',postRegistration);

module.exports = router;