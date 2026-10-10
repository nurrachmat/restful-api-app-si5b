require('dotenv').config();

const path = require('path');
const { spawn } = require('child_process');
const newman = require('newman');

const PORT = process.env.TEST_PORT || '3100';
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('API_KEY belum diisi di .env');
  process.exit(1);
}

// ---------- Server khusus pengujian ----------
// Dijalankan di port terpisah supaya data in-memory selalu mulai dari awal
// dan tidak bentrok dengan `npm run dev`.
const server = spawn(process.execPath, ['app.js'], {
  cwd: path.join(__dirname, '..'),
  env: { ...process.env, PORT },
  stdio: ['ignore', 'pipe', 'inherit'],
});

let selesai = false;

function akhiri(kode) {
  selesai = true;
  server.kill();
  process.exit(kode);
}

server.on('exit', () => {
  if (!selesai) {
    console.error(`Server pengujian berhenti sebelum waktunya (port ${PORT})`);
    process.exit(1);
  }
});

// ---------- Jalankan collection setelah server siap ----------
server.stdout.once('data', () => {
  newman.run({
    collection: require('./restful-api.postman_collection.json'),
    environment: require('./local.postman_environment.json'),
    envVar: [
      { key: 'baseUrl', value: `http://localhost:${PORT}` },
      { key: 'apiKey', value: API_KEY },
    ],
    reporters: 'cli',
  }, (err, summary) => {
    if (err) {
      console.error(err);
      return akhiri(1);
    }
    akhiri(summary.run.failures.length ? 1 : 0);
  });
});
