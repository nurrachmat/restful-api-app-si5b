const express = require('express');
const router = express.Router();
const prodiController = require('../controllers/prodiController');
// const cekApiKey = require('../middlewares/cekApiKey');
const verifyToken = require('../middlewares/verifyToken');
const hanyaRole = require('../middlewares/hanyaRole');

router.get('/', prodiController.getAll);
// router.get('/:id', prodiController.getById);
router.post('/', verifyToken, hanyaRole('admin'), prodiController.create);

module.exports = router;