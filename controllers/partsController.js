const Part = require('../models/Part');

// GET /parts
module.exports.parts_list = (req, res, next) => {
  Part.find().exec((err, parts_list) => {
    if (err) { return res.json(err); };
    return res.json(parts_list);
  });
};

// POST /parts
module.exports.create_part = (req, res, next) => {
  return res.send('create new part')
};

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