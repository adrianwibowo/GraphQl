const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    nama: String,
    alamat: String
})

module.exports = mongoose.model('User', UserSchema)
