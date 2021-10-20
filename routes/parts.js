var express = require('express');
var router = express.Router();

const partsController = require('../controllers/partsController');

router.get('/', partsController.parts_list);
router.post('/', partsController.create_part);

router.get('/:partID', partsController.view_part);
router.put('/:partID', partsController.edit_part);
router.delete('/:partID', partsController.delete_part);

module.exports = router;
