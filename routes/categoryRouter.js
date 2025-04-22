const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { createCategory, updateCategory, deleteCategory, getAllCategoriesByRestaurantId } = require('../controllers/categoryController');

const router = express.Router();


// Define routes and map them to controller methods
router.post('/create', authMiddleware, createCategory);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);
router.get('/all', authMiddleware, getAllCategoriesByRestaurantId);

module.exports = router;