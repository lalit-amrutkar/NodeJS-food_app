const menuItemSchema = require("../models/menuItemModels");
const Category = require("../models/categoryModels");
const Restaurant = require("../models/restaurantModels");


// Controller to create a new menu item
const createMenuItem = async (req, res) => {
    try {
        const { categoryId, restaurantId } = req.body; // Destructuring a request body
        const existingRestaurant = await Restaurant.findById(restaurantId);
        if (!existingRestaurant) {
            return res.status(400).json({
                success: false,
                message: 'Restaurant does not exist'
            });
        }

        const existingCategory = await Category.findById(categoryId);
        if (!existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category does not exist'
            });
        }
        const { name } = req.body; // Destructuring a request body          
        const existingMenuItem = await menuItemSchema.findOne({ name });
        if (existingMenuItem) {
            return res.status(400).json({
                success: false,
                message: 'Menu item already exists for this category'
            });
        }

        const newMenuItem = await menuItemSchema.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            data: {
                menuItem: newMenuItem
            }
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to create menu item',
            error: err.message
        });
    }
}

const updateMenuItem = async (req, res) => {
    try {
        const updatedMenuItem = await menuItemSchema.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // dynamically update whatever fields are sent
            { new: true, runValidators: true }
        );
        if (!updatedMenuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Menu item updated successfully',
            data: {
                menuItem: updatedMenuItem
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to update menu item',
            error: err.message
        });
    }
}

const deleteMenuItem = async (req, res) => {
    try {
        const deletedMenuItem = await menuItemSchema.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Menu item deleted successfully',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to delete menu item',
            error: err.message
        });
    }
}

const getMenuById = async (req, res) => {
    try {
        const menuItem = await menuItemSchema.findById(req.params.id).populate('categoryId restaurantId');
        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {
                menuItem
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to get menu item',
            error: err.message
        });
    }
}
// Controller to get all menu items by category ID
const getAllMenuItemsByCategoryId = async (req, res) => {
    try {
        const menuItems = await menuItemSchema.find({ categoryId: req.params.id }).populate('categoryId restaurantId');
        if (menuItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No menu items found for this category'
            });
        }

        res.status(200).json({
            success: true,
            data: menuItems
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to get menu items',
            error: err.message
        });
    }
}
// Controller to get all menu items by restaurant ID

const getAllMenuItemsByRestaurantId = async (req, res) => {
    try {
        console.log(req.params.id);
        const menuItems = await menuItemSchema.find({ restaurantId: req.params.id });

        if (menuItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No menu items found for this restaurant'
            });
        }

        res.status(200).json({
            success: true,
            data: menuItems
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to get menu items',
            error: err.message
        });
    }
};


// Controller to get all menu items by restaurant ID
module.exports = { createMenuItem, updateMenuItem, deleteMenuItem, getMenuById, getAllMenuItemsByRestaurantId, getAllMenuItemsByCategoryId };