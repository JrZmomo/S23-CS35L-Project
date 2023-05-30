const { MongoGridFSChunkError } = require('mongodb')
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false,
        default: "Nothing"
    }
})



module.exports = mongoose.model('User', userSchema)
