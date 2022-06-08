const mongoose = require('mongoose');

const chipSchema = mongoose.Schema({
  email : { required: true, type : String},
  name : { required: true, type : String},
  imagePath : {required: true, type : String}
})

module.exports = mongoose.model('Chips',chipSchema);
