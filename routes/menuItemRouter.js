const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const { createMenuItem, updateMenuItem, deleteMenuItem, getMenuById, getAllMenuItemsByRestaurantId, getAllMenuItemsByCategoryId } = require('../controllers/menuItemController');


// Define routes and map them to controller methods
router.post('/create', authMiddleware, createMenuItem);
router.get('/:id', authMiddleware, getMenuById);
router.put('/:id', authMiddleware, updateMenuItem);
router.delete('/:id', authMiddleware, deleteMenuItem)
router.get('/all/:id', authMiddleware, getAllMenuItemsByRestaurantId);
router.get('/category/:id', authMiddleware, getAllMenuItemsByCategoryId);

module.exports = router;