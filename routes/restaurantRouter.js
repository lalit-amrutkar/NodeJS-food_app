const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createRestaurant, updateRestaurant, deleteRestaurant, getAllRestaurantsByOwner, getRestaurantById } = require('../controllers/restaurantController');

const router = express.Router();

// Define routes and map them to controller methods
router.post('/create', authMiddleware, createRestaurant);
router.put('/update/:id', authMiddleware, updateRestaurant);
router.delete('/delete/:id', authMiddleware, deleteRestaurant);
router.get('/all/:id', authMiddleware, getAllRestaurantsByOwner);
router.get('/:id', authMiddleware, getRestaurantById);

module.exports = router;
