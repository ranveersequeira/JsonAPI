const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    preferences: mongoose.SchemaTypes.Mixed

}, { timestamps: true })


UserSchema.plugin(require('passport-local-mongoose'))


module.exports = mongoose.model('User', UserSchema)
