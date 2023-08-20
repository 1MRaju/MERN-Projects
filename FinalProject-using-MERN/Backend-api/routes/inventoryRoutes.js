const express = require('express');
const authMiddleWare = require('../middlewares/authMiddleWare');
const { 
    createInventoryController, 
    getInventoryController, 
    getDonarsController, 
    getHospitalController,
    getOrganisationController,
    getOrganisationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController, 
    } = require('../controllers/inventoryController');

const router = express.Router();

//routes
//add inventory|| post
router.post('/create-inventory', authMiddleWare, createInventoryController);

//get blood records
router.get('/get-inventory', authMiddleWare, getInventoryController)

//get recent blood records
router.get('/get-recent-inventory', authMiddleWare, getRecentInventoryController)

//get hospital blood records
router.post('/get-inventory-hospital', authMiddleWare,  getInventoryHospitalController)

//get donar records
router.get('/get-donars', authMiddleWare, getDonarsController)

//get hospital records
router.get('/get-hospitals', authMiddleWare,  getHospitalController)

//get organisation records
router.get('/get-organisation', authMiddleWare,  getOrganisationController)

//get organisation for hospital records
router.get('/get-organisation-for-hospital', authMiddleWare,  getOrganisationForHospitalController)

module.exports = router