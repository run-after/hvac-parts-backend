const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  manufacturer: { type: String, required: true },
  model: { type: String, required: true },
  serial: {type: String, required: true, unique: true},
  name: { type: String, required: true },
  type: {type: String, required: true}
});

module.exports = mongoose.model('Equipment', EquipmentSchema);