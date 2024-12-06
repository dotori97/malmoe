const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require("../middleware/auth_middleware");
const router = express.Router(); 
const { check } = require('express-validator');

router.get('/', authenticate, userController.findUserByEmail);
router.put('/',  [
    check('name').notEmpty().withMessage("Name is required")
], authenticate, userController.updateUserByEmail);
router.delete('/', userController.deleteUserByEmail); 

module.exports = router;
