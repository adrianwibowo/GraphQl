const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ForumSchema = new Schema({
    title: String,
    desc: String,
    userId: String
})

module.exports = mongoose.model('Forum', ForumSchema)
