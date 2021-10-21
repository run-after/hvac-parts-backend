const Equipment = require('../models/Equipment');
const { body, validationResult } = require('express-validator');

// GET /equipment - get a list of all equipment
module.exports.equipment_list = (req, res, next) => {
  Equipment.find().exec((err, equipment_list) => {
    if (err) { return res.json(err); };
    return res.json(equipment_list);
  });
};

// POST /equipment - create a new piece of equipment
module.exports.create_equipment = [
  
  // Validate info
  body('manufacturer', 'You must enter a manufacturer').trim().isLength({ min: 1 }).escape(),
  body('model', 'You must enter a model number').trim().isLength({ min: 1 }).escape(),
  body('serial', 'You must enter a serial number').trim().isLength({ min: 1 }).escape(),
  body('name', 'You must enter a unit name').trim().isLength({ min: 1 }).escape(),
  body('type', 'You must enter a equipment type').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = [];
      errors.errors.forEach(msg => {
        errorMessages.push(msg.msg);
      });
      return res.json({ 'message': errorMessages });
    };

    const equipment = new Equipment({
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      serial: req.body.serial,
      name: req.body.name,
      type: req.body.type,
      parts: []
    });

    equipment.save((err, post) => {
      if (err) { return res.json(err); };
      return res.json(equipment);
    });
  }
];

//GET /equipment/:equipmentID - view single piece of equipment
module.exports.view_equipment = (req, res, next) => {
  Equipment.findById(req.params.equipmentID, (err, equipment) => {
    if (err) { return res.json({ 'message': 'Equipment not found' }); };
    return res.json(equipment);
  })
};

// PUT /equipment/:equipmentID - edit equipment
module.exports.edit_equipment = [
  
  body('manufacturer', 'You must enter a manufacturer').trim().isLength({ min: 1 }).escape(),
  body('model', 'You must enter a model number').trim().isLength({ min: 1 }).escape(),
  body('serial', 'You must enter a serial number').trim().isLength({ min: 1 }).escape(),
  body('name', 'You must enter a unit name').trim().isLength({ min: 1 }).escape(),
  body('type', 'You must enter a equipment type').trim().isLength({ min: 1 }).escape(),
  
  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      const errorMessages = [];
      errors.errors.forEach((msg) => {
        errorMessages.push(msg.msg);
      });

      return res.json({ 'message': errorMessages });
    };

    const equipment = Equipment.findById(req.params.equipmentID).exec((err, equip) => {
      if (err) { return res.json(err); };
      equip.manufacturer = req.body.manufacturer;
      equip.model = req.body.model;
      equip.serial = req.body.serial;
      equip.name = req.body.name;
      equip.type = req.body.type;
      equip.save((err, equip) => {
        if (err) { return res.json(err); };
        return res.json(equip);
      });
    });
  }
];

// DELETE /equipment/:equipmentID - delete equipment
module.exports.delete_equipment = (req, res, next) => {
  Equipment.findByIdAndDelete(req.params.equipmentID, (err, deletedEquipment) => {
    if (err || !deletedEquipment) { return res.json({ 'message': ['Equipment not found'] }); };
    return res.json(deletedEquipment);
  });
};