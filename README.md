# Kerberos-Style AES Encryption App

This project demonstrates **AES-256 encryption/decryption** combined with a **Kerberos-style ticket request workflow** (mocked for learning purposes).

## 🚀 Features

✅ Encrypt plain text using AES-256  
✅ Decrypt AES ciphertext using the same key  
✅ 
Ticket
Request flow (simulated Kerberos behavior)  
✅ Frontend (HTML/CSS/JS) + Backend (Node.js + Express)  



## 🧩 How the App Works

1. The user enters a username + password.
2. The frontend sends a **ticket request** to the backend.
3. The backend:
   - Hashes the password
   - Generates a session key
   - Encrypts the session key using the hashed password
4. The frontend:
   - Decrypts the session key
   - Uses it to perform **AES-256 encryption/decryption**

 **Note:** This is not a full Kerberos implementation — only the concept of a *Ticket Granting Service* is simulated.



## 🛠️ Tech Stack

| Part        | Technology |
|-------------|------------|
| Backend     | Node.js + Express |
| Encryption  | AES-256 (Web Crypto API) |
| Styling     |HTML, CSS (Glass UI style) |


## ⚠️ Disclaimer

**This project is for educational purposes only.
Do not use this code in production environments.**
