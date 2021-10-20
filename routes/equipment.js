var express = require('express');
var router = express.Router();

const equipmentController = require('../controllers/equipmentController');

router.get('/', equipmentController.equipment_list);
router.post('/', equipmentController.create_equipment);

router.get('/:equipmentID', equipmentController.view_equipment);
router.put('/:equipmentID', equipmentController.edit_equipment);
router.delete('/:equipmentID', equipmentController.delete_equipment);

module.exports = router;
