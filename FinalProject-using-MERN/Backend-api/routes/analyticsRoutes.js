const express = require('express');
const authMiddleWare = require('../middlewares/authMiddleWare');
const { bloodGroupDetailsController } = require('../controllers/analyticsController');



    const router = express.Router();
    
    //routes
    //get blood data
    router.get('/bloodGroups-data', authMiddleWare, bloodGroupDetailsController)

module.exports = router