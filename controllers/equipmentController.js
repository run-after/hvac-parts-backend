const Equipment = require('../models/Equipment');

// GET /equipment
module.exports.equipment_list = (req, res, next) => {
  Equipment.find().exec((err, equipment_list) => {
    if (err) { return res.json(err); };
    return res.json(equipment_list);
  });
};

// POST /equipment
module.exports.create_equipment = (req, res, next) => {
  //Create equipment
};

//GET /equipment/:equipmentID - view single piece of equipment
module.exports.view_equipment = (req, res, next) => {
  Equipment.findById(req.params.equipmentID, (err, equipment) => {
    if (err) { return res.json({ 'message': 'Equipment not found' }); };
    return res.json(equipment);
  })
};

// PUT /equipment/:equipmentID - edit equipment
module.exports.edit_equipment = (req, res, next) => {
  equipment.findById(req.params.equipmentID, (err, equipment) => {
    // What do I want to be able to change?
  });
};

// DELETE /equipment/:equipmentID - delete equipment
module.exports.delete_equipment = (req, res, next) => {
  Equipment.findByIdAndDelete(req.params.equipmentID, (err, equipment) => {
    if (err || !equipment) { return res.json({ 'message': ['Equipment not found'] }); };
    // What to send back if deleted?
  })
};