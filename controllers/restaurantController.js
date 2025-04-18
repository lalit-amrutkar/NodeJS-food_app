const { validationResult } = require('express-validator');
const Restaurant = require('../models/restaurantModels');


// Controller to create a new restaurant
const createRestaurant = async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    try {
        const { email } = req.body; // Destructuring a request body
        const existing = await Restaurant.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Restaurant already exists'
            });

        }
        const newRestaurant = await Restaurant.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Restaurant created successfully',
            data: {
                restaurant: newRestaurant
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to create restaurant',
            error: err.message
        });
    }
};

// Controller to update a restaurant by ID
const updateRestaurant = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedRestaurant) {
            return res.status(404).json({
                status: 'fail',
                message: 'Restaurant not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: updatedRestaurant
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Controller to delete a restaurant by ID
const deleteRestaurant = async (req, res) => {
    try {
        console.log(req)
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Restaurant deleted successfully',
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

// Controller to get all restaurants by owner
const getAllRestaurantsByOwner = async (req, res) => {
    try {
        const { id } = req.params; // correct key from route
        const restaurants = await Restaurant.find({ owner: id });

        res.status(200).json({
            success: true,
            message: 'Restaurants retrieved successfully',
            results: restaurants.length,
            data: {
                restaurants
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Controller to get a single restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({
                status: 'fail',
                message: 'Restaurant not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                restaurant
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};


module.exports = {
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getAllRestaurantsByOwner,
    getRestaurantById
};