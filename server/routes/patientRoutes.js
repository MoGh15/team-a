const express = require('express');
const router = express.Router();
const {
  submitIntakeForm,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');

const auth = require('../middleware/auth');


router.post('/submit', submitIntakeForm);


router.route('/')
  .get(auth, getAllPatients);

router.route('/:id')
  .get(auth, getPatientById)
  .put(auth, updatePatient)
  .delete(auth, deletePatient);

module.exports = router;