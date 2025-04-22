const validationResult = require('express-validator');

const Category = require('../models/categoryModels');
const Restaurant = require('../models/restaurantModels');


const createCategory = async (req, res) => {
    try {
        const { restaurantId } = req.body; // Destructuring a request body
        const existingRestaurant = await Restaurant.findById(restaurantId);
        const { name } = req.body; // Destructuring a request body
        const existingCategory = await Category.findOne({ name, restaurantId });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists for this restaurant'
            });
        }
        if (!existingRestaurant) {
            return res.status(400).json({
                success: false,
                message: 'Restaurant does not exist'
            });
        }
        const newCategory = await Category.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: {
                category: newCategory
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to create category',
            error: err.message
        });
    }
}

const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: {
                category: updatedCategory
            }
        });


    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to update category',
            error: err.message
        });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to delete category',
            error: err.message
        });
    }
}

const getAllCategoriesByRestaurantId = async (req, res) => {
    try {
        const { restaurantId } = req.body; // Destructuring a request body
        const existingRestaurant = await Restaurant.find({ _id: restaurantId });
        if (!existingRestaurant) {
            return res.status(400).json({
                success: false,
                message: 'Restaurant does not exist'
            });
        }
        const categories = await Category.find({ restaurantId });
        res.status(200).json({
            success: true,
            message: 'Categories fetched successfully',
            data: {
                categories
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to fetch categories',
            error: err.message
        });
    }
}
module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategoriesByRestaurantId
};
