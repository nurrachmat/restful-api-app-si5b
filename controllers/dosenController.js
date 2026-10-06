const dosenModel = require('../models/dosenModel');
const prodiModel = require('../models/prodiModel');
const { errorHttp } = require('../middlewares/errorHandler');

exports.getAll = (req, res) => {
  const prodiId = req.query.prodiId ? parseInt(req.query.prodiId) : undefined;
  res.json(dosenModel.getAll(prodiId));
};

exports.getById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = dosenModel.getById(id);
  if (!data) return next(errorHttp(404, 'Prodi tidak ditemukan'));
  res.json(data);
};

exports.create = (req, res, next) => {
  const { nama, nip, prodiId } = req.body;
  if (!nama || !nip || !prodiId) {
    return next(errorHttp(400, 'nama, nip, dan prodiId wajib diisi'));
  }

  // Controller mengoordinasikan dua Model: memvalidasi relasi
  // sebelum data baru dibuat di prodiModel.
  const indukProdi = prodiModel.getById(parseInt(prodiId));
  if (!indukProdi) return next(errorHttp(400, 'prodiId tidak ditemukan'));

  const baru = dosenModel.create({ nama, nip, prodiId: parseInt(prodiId) });
  res.status(201).json(baru);
};