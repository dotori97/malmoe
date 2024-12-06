const express = require("express");
const dictionaryController = require("../controllers/dictionaryController");
const { check } = require("express-validator");
const { authenticate } = require("../middleware/auth_middleware");
const router = express.Router();

// word, category 조회와 등록/수정을 모두 post로 method로 묶음
// console.log(" dictionaryRoute.js router까지는 들어옴");
router.post("/type/:type", authenticate, dictionaryController.postTypeBranch);
router.delete("/:id", authenticate, dictionaryController.deleteDictionary);

module.exports = router;
