const express = require('express');
const router = express.Router();
const dosenController = require('../controllers/dosenController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', dosenController.getAll);
router.get('/:id', dosenController.getById);
router.post('/', cekApiKey, dosenController.create);

module.exports = router;