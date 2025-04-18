const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'user name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phone: {
        type: Number,
        required: [true, 'Number is required']
    },
    address: {
        type: String,
        required: [false]
    },
    usertype: {
        type: String,
        required: [true, 'usertype is required'],
        default: 'client',
        enum: ['client', 'admin']
    },
    profile: {
        type: String,
        default: "data:image/png;base64,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"
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)