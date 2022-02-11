const mongoose = require("mongoose")
const Mixed = mongoose.Schema.Types.Mixed

const basketSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    pantryId: {
        type:String,
        required: true,
        trim: true
    },

    data: {
        type:Mixed
    },

    ttl: {
        type: Number,
        default: null
    }
     
}, {timestamps: true})

module.exports = mongoose.model("basketCollection", basketSchema)