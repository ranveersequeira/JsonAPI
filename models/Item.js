const mongoose = require('mongoose')
const { Schema } = mongoose;


const ItemSchema = new Schema({
    content: mongoose.SchemaTypes.Mixed,
    itemtype: String,
    creator: {
        type: String,
        ref: "User"
    }
})

module.exports = mongoose.model('Item', ItemSchema)
