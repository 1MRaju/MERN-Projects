const express = require('express')

const authMiddleWare = require('../middlewares/authMiddleWare');

const { 
    getDonarsListController, 
    getHospitalListController, 
    getOrgController,
    deleteDonarController, 
    deleteHospitalController, 
    deleteOrgController,
    updateDonarController,
    updateHospitalController,
    updateOrgController
} = require('../controllers/adminController');

const adminMiddleware = require('../middlewares/adminMiddleware');

//router object
const router = express.Router()

//routes

//use get method, to get donar list
router.get('/donar-list', authMiddleWare,adminMiddleware, getDonarsListController)

//use get method, to get hospital list
router.get('/hospital-list', authMiddleWare,adminMiddleware, getHospitalListController)

//use get method, to get hospital list
router.get('/organisation-list', authMiddleWare,adminMiddleware, getOrgController)


//delete donars
router.delete('/delete-donar/:id', authMiddleWare, adminMiddleware, deleteDonarController)
//edit & update donars
router.put('/update-donar/:id', authMiddleWare, adminMiddleware, updateDonarController)


//delete hospital
router.delete('/delete-hospital/:id', authMiddleWare, adminMiddleware, deleteHospitalController)
//edit & update hospital
router.put('/update-hospital/:id', authMiddleWare, adminMiddleware, updateHospitalController)


//delete organisation
router.delete('/delete-org/:id', authMiddleWare, adminMiddleware, deleteOrgController)
//edit & update organisation
router.put('/update-org/:id', authMiddleWare, adminMiddleware, updateOrgController)

//exports
module.exports = router;