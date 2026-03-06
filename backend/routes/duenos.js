const express = require('express');
const router = express.Router();
const duenosController = require('../controllers/duenosController');

router.get('/', duenosController.getAllDuenos);
router.get('/:id', duenosController.getDuenoById);
router.post('/', duenosController.createDueno);
router.put('/:id', duenosController.updateDueno);
router.delete('/:id', duenosController.deleteDueno);

module.exports = router;