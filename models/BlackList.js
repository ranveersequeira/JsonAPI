const mongoose = require('mongoose')


const BlacklistSchema = new mongoose.Schema({
    token: String,
    userId: String
}, { timestamps: true })



module.exports = mongoose.model('Blacklist', BlacklistSchema)
