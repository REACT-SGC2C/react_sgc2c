const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var celebSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String
  },
  species: {
    type: String
  },
  userId: String
});

module.exports = exports = mongoose.model('Celeb', celebSchema);
