const { MongoGridFSChunkError } = require('mongodb')
const mongoose = require('mongoose')


const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    context: {
        type: [String]
    }
})

module.exports = mongoose.model('File', fileSchema)

