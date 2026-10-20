const mongoose = require('mongoose');

const mahasiswaSchema = new mongoose.Schema({
  nama: { type: String, required: [true, 'nama wajib diisi'], trim: true },
  nim: { type: String, required: [true, 'nim wajib diisi'], unique: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mahasiswa', mahasiswaSchema);