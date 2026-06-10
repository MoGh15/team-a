const express = require('express');
const router = express.Router();
const { submitIntakeForm } = require('../controllers/patientController');


router.post('/intake', submitIntakeForm);

module.exports = router;