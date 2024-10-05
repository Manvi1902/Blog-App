const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');

// router object
const router = express.Router()

//GET all users || GET
router.get('/all-users', getAllUsers)

// create user || POSTregister
router.post('/register', registerController);

// LOGIN || POST
router.post('/login',loginController);

module.exports = router;
