const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartSchema = new Schema({
  manufacturer: { type: String, required: true },
  partNumber: { type: String, required: true, unique: true },
  description: {type: String, required: true},
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  link: { type: String }
});

module.exports = mongoose.model('Part', PartSchema);