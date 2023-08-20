const express = require('express')
const { registerController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleWare = require('../middlewares/authMiddleWare');

const router = express.Router()

//routes
//REGISTER || POST
router.post('/register',registerController);

//LOGIN || POST
router.post('/login', loginController);

//GET CURRENT USER || GET 
router.get('/current-user', authMiddleWare, currentUserController)

module.exports=router;