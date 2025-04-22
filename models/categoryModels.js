const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
    },
    image: {
        type: String,
        required: false,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);