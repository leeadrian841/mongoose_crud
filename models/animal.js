var mongoose = require('mongoose')

var animalSchema = new mongoose.Schema({
  name: String,
  breed: String,
  date: {
    type: Date,
    default: Date.now
  },
  gender: String,
  family: String,
  status: {
    type: String,
    enum: ['Adopted', 'Orphan']
  }
})

var Animal = mongoose.model('Animal', animalSchema)
module.exports = Animal
