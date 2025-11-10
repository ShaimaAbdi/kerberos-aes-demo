const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Simple user database
const users = { shaima: '123', bob: 'mypassword' };

// Mock KDC endpoint
app.post('/request-ticket', (req, res) => {
  const { username, password } = req.body;

  if (!users[username] || users[username] !== password) {
    return res.status(401).json({ success: false, message: 'Invalid username/password' });
  }

  // Generate random AES session key (32 bytes)
  const sessionKey = crypto.randomBytes(32);

  // Encrypt session key with user's password using AES-GCM
  const key = crypto.pbkdf2Sync(password, 'salt', 100000, 32, 'sha256');
  const iv = crypto.randomBytes(12); // 12 bytes IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(sessionKey), cipher.final()]);
  const tag = cipher.getAuthTag(); // 16 bytes tag

  res.json({
    success: true,
    ticket: Buffer.concat([iv, tag, encrypted]).toString('base64'), // [IV|TAG|CIPHERTEXT]
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
