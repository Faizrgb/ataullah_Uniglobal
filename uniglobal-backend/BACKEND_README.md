# Backend - Uniglobal Study Abroad Consultancy

Express.js backend for Uniglobal consultancy platform with JSON file storage.

## Features

✅ Lead form API (POST/GET/PUT/DELETE)
✅ Admin authentication (JWT)
✅ JSON file storage (no database required)
✅ Password hashing with bcrypt
✅ CORS enabled
✅ Input validation
✅ Error handling

## Tech Stack

- **Node.js** - Runtime
- **Express.js** - Framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **JSON** - Data storage

## Quick Start

### Installation

```bash
npm install
```

### Setup Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=development
```

### Run Development

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

### Run Production

```bash
npm start
```

---

## API Endpoints

### Health Check
```
GET /api/health
Response: { "status": "OK", "timestamp": "..." }
```

### Leads API

**Create Lead**
```
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555-0100",
  "degree": "Master",
  "country": "USA",
  "preferredCountry": "USA",
  "budget": "40-60L",
  "intake": "Fall 2025"
}

Response: { "success": true, "status": 201, "data": { ...lead } }
```

**Get All Leads**
```
GET /api/leads
Headers: Authorization: Bearer {token}
Response: { "success": true, "status": 200, "data": [...leads] }
```

**Get Single Lead**
```
GET /api/leads/{leadId}
Headers: Authorization: Bearer {token}
Response: { "success": true, "status": 200, "data": {...lead} }
```

**Update Lead**
```
PUT /api/leads/{leadId}
Headers: Authorization: Bearer {token}
Content-Type: application/json
{ ...fields to update }

Response: { "success": true, "status": 200, "data": {...updated} }
```

**Delete Lead**
```
DELETE /api/leads/{leadId}
Headers: Authorization: Bearer {token}
Response: { "success": true, "status": 200 }
```

**Get Lead Stats**
```
GET /api/leads/stats/overview
Headers: Authorization: Bearer {token}
Response: { "success": true, "status": 200, "data": {...statistics} }
```

### Admin API

**Initialize Admin (First Time Only)**
```
POST /api/admin/init
Content-Type: application/json

{
  "email": "admin@uniglobal.com",
  "password": "SecurePassword123",
  "name": "Administrator"
}

Response: { "success": true, "message": "Admin created" }
```

**Admin Login**
```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@uniglobal.com",
  "password": "SecurePassword123"
}

Response: { "success": true, "data": { "token": "jwt-token...", "admin": {...} } }
```

**Get Admin Profile**
```
GET /api/admin/profile
Headers: Authorization: Bearer {token}
Response: { "success": true, "status": 200, "data": {...profile} }
```

**Update Admin Profile**
```
PUT /api/admin/profile
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Name",
  "phone": "+1 555-0100"
}

Response: { "success": true, "data": {...updated} }
```

**Change Password**
```
PUT /api/admin/change-password
Headers: Authorization: Bearer {token}
Content-Type: application/json

{
  "oldPassword": "CurrentPassword123",
  "newPassword": "NewPassword456"
}

Response: { "success": true, "message": "Password changed" }
```

---

## File Structure

```
src/
├── server.js              # Express app setup
├── config/
│   └── db.js             # JSON storage initialization
├── controllers/
│   ├── leadController.js # Lead CRUD logic
│   └── adminController.js # Admin auth logic
├── routes/
│   ├── leads.js          # Lead endpoints
│   └── admin.js          # Admin endpoints
├── middleware/
│   └── auth.js           # JWT verification
└── utils/
    └── storage.js        # JSON file operations

data/
├── leads.json            # Leads storage
└── admin.json            # Admin accounts storage
```

---

## Data Storage

All data stored in `data/` folder as JSON files:

**leads.json** - List of submitted leads
**admin.json** - Admin accounts with hashed passwords

Files are auto-created on first run.

---

## Authentication

Backend uses JWT tokens:

1. **Admin Login** → Get token
2. **Use token** in `Authorization: Bearer {token}` header
3. **Token valid for** 7 days (configurable)
4. **Invalid tokens** → 401 Unauthorized response

---

## CORS Configuration

Allowed origins:
- `http://localhost:5173` (local frontend)
- `https://uniglobal-consultancy.vercel.app` (production frontend)

---

## Deployment on Replit

### 1. Push to GitHub

```bash
git push origin main
```

### 2. Create Replit Project

1. Go to https://replit.com
2. Click **"+ Create"**
3. Select **"Import from GitHub"**
4. Enter repo URL
5. Click **"Run"**

### 3. Get Live URL

Once running: `https://uniglobal-backend.YOUR_USERNAME.repl.co`

### 4. Test API

```bash
curl https://uniglobal-backend.YOUR_USERNAME.repl.co/api/health
```

---

## Notes

- **No external database** - Everything stored in JSON
- **Suitable for** - MVP, demos, moderate traffic
- **Leads stored** - In `data/leads.json` (no limit enforced)
- **Passwords hashed** - Using bcryptjs (secure)
- **Error handling** - Centralized error responses

---

## License

ISC

---

**Ready to deploy? Check [DEPLOYMENT.md](../DEPLOYMENT.md) for full guide!**
