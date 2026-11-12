const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');
// const cekApiKey = require('../middlewares/cekApiKey');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', mahasiswaController.getAll);
router.get('/:id', mahasiswaController.getById);
router.post('/', verifyToken, mahasiswaController.create);
router.put('/:id', verifyToken, mahasiswaController.update);
router.delete('/:id', verifyToken, mahasiswaController.remove);

module.exports = router;