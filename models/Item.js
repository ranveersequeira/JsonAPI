const mongoose = require('mongoose')
const { Schema } = mongoose;


const ItemSchema = new Schema({
    content: mongoose.SchemaTypes.Mixed,
    itemType: String,
    creator: {
        type: String,
        ref: "User"
    }
}, { timestamps: true })

module.exports = mongoose.model('Item', ItemSchema)
