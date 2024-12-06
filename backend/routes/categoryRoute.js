const express = require('express');
const categoryService = require('../services/categoryService');
const categoryController = require('../controllers/categoryController');
const {check } = require('express-validator')
//const { authenticate } = require("../middleware/auth_middleware");
const router = express.Router();

console.log("Category routes file loaded");

router.post('/create', [
    check('c_name').notEmpty().withMessage("Name is required")
], 
  categoryController.createCategory);
router.put('/updateCategory', [ check('c_name').notEmpty().withMessage("Name is required") ], categoryController.updateCategory);
router.delete('/:c_id', categoryController.deleteCategoryById);
router.delete('/email/:email', categoryController.deleteCategoryByEmail);
router.get('/:c_id', categoryController.findCategoryById);
router.get('/email/:email', categoryController.findCategoryByEmail); 

router.get("/", async (req, res) => {
    try {
      const email = req.query.email; // 쿼리스트링으로 이메일 받기
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
  
      // 서비스 계층 호출
      const categories = await categoryService.findCategoryByEmail(email); 
      res.status(200).json({ data: categories, message: 'ok' });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  
  const categoryDao = require('../dao/categoryDao');

router.delete('/:c_id', async (req, res) => {
    const { c_id } = req.params;

    try {
        const result = await categoryDao.deleteCategoryById(c_id);
        if (result) {
            return res.status(200).json({ message: "Category and related data deleted successfully." });
        } else {
            return res.status(404).json({ message: "Category not found." });
        }
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).json({ error: "An error occurred while deleting the category." });
    }
});


module.exports = router;
