const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['veg', 'non-veg'],
        default: 'veg',
        required: [true, 'Restaurant type is required']
    },
    location: {
        type: String,
        required: [true, 'Location type is required'],
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    }
});


module.exports = mongoose.model('Restaurant', restaurantSchema);