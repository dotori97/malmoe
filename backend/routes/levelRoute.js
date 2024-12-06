const express = require('express');
const levelController = require('../controllers/levelController');
const { authenticate } = require("../middleware/auth_middleware");
const router = express.Router();

router.get('/category', levelController.findLevelByCategory);
router.get('/email', authenticate, levelController.findLevelByEmail);
router.put('/id/:id', levelController.updateLevelByID);

module.exports = router;
 