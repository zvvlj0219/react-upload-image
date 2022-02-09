const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  photo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
