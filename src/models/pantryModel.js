const mongoose = require("mongoose")

const pantrySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    pantryId: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    description : {
        type: String,
        default: null,
        trim: true
    },

    error : {
        type: Array
    },

    notifications: {
        type: Boolean,
        default: true
    },

    percentFull: {
        type: Number,
        default: 0
    }

}, {timestamps: true})

module.exports = mongoose.model("pantryCollection", pantrySchema)