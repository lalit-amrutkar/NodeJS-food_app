const mongoose = require("mongoose");
const { route } = require("../routes/restaurantRouter");
const { Schema } = mongoose;

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: [true, "Menu item name is required"],
    },
    description: {
        type: String,
        required: [true, "Menu item description is required"],
    },
    price: {
        type: Number,
        required: [true, "Menu item price is required"],
    },
    image: {
        type: String,
        required: false,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
})

module.exports = mongoose.model("MenuItem", menuItemSchema);