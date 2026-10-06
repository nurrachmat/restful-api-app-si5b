let dosen = [
  { id: 1, nama: 'Ahmad, M.Kom.', nip: '111111', prodiId: 1 },
  { id: 2, nama: 'Budi, M.Kom.', nip: '222222', prodiId: 1 },
];
let nextId = 3;

function getAll(prodiId) {
  if (prodiId) return dosen.filter((p) => p.prodiId === prodiId);
  return dosen;
}

function getById(id) {
  return dosen.find((p) => p.id === id);
}

function create(data) {
  const baru = { id: nextId++, ...data };
  dosen.push(baru);
  return baru;
}

module.exports = { getAll, getById, create };