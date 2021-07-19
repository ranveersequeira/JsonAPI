const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    preferences: mongoose.SchemaTypes.Mixed

})


module.exports = mongoose.model('User', UserSchema)
