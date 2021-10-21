const Part = require('../models/Part');

// GET /parts - sget all parts
module.exports.parts_list = (req, res, next) => {
  Part.find().exec((err, parts_list) => {
    if (err) { return res.json(err); };
    return res.json(parts_list);
  });
};

// POST /parts - create new part
module.exports.create_part = [
  
  // Validate info
  body('manufacturer', 'You must enter a manufacturer').trim().isLength({ min: 1 }).escape(),
  body('partNumber', 'You must enter a part number').trim().isLength({ min: 1 }).escape(),
  body('description', 'You must enter a description').trim().isLength({ min: 1 }).escape(),
  body('quantity', 'You must enter a number').trim().isNumber().escape(),
  body('type', 'You must enter a part type').trim().isLength({ min: 1 }).escape(),
  body('link', 'You must enter a link to buy part').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = [];
      errors.errors.forEach(msg => {
        errorMessages.push(msg.msg);
      });
      return res.json({ 'message': errorMessages });
    };

    const part = new Part({
      manufacturer: req.body.manufacturer,
      partNumber: req.body.partNumber,
      description: req.body.description,
      quantity: req.body.quantity,
      type: req.body.type,
      link: req.body.link
    });

    part.save((err, part) => {
      if (err) { return res.json(err); };
      return res.json(part);
    });
  }
];

//GET /parts/:partID - view single part
module.exports.view_part = (req, res, next) => {
  Part.findById(req.params.partID, (err, part) => {
    if (err) { return res.json({ 'message': 'Part not found' }); };
    return res.json(part);
  })
};

// PUT /parts/:partID - edit part
module.exports.edit_part = (req, res, next) => {
  Part.findById(req.params.partID, (err, part) => {
    // What do I want to be able to change?
  });
};

// DELETE /parts/:id - delete part
module.exports.delete_part = (req, res, next) => {
  Part.findByIdAndDelete(req.params.partID, (err, part) => {
    if (err || !part) { return res.json({ 'message': ['Part not found'] }); };
    // What to send back if deleted?
  })
};