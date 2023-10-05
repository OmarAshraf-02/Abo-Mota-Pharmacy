const express = require('express');
const router = express.Router();
const {getMedicines,
    getApplications,
    addAdmin,
    deleteAdmin,
    deletePatient,
    deletePharmacist,
    getPatients,
    getPatient,
    getPharmacist,
    getPharmacists,
    getApplication} = require('../controller/adminController');


router.get('/medicines', getMedicines);

router.get('/applications', getApplications);

router.get('/applications/:id', getApplication)

router.get('/patients', getPatients);

router.get('/patients/:id', getPatient);

router.get('/pharmacists', getPharmacists);

router.get('/pharmacists/:id',getPharmacist);

router.post('/admins', addAdmin);

router.delete('/admins/:id', deleteAdmin);

router.delete('/patients/:id', deletePatient);

router.delete('/pharmacists/:id', deletePharmacist);


module.exports= router;
