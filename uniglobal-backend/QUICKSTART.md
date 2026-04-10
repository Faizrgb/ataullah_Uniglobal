# 🚀 Quick Start Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

## Step 1: Initial Setup

### 1.1 Rename environment file
```bash
cp .env.example .env
```

### 1.2 Update `.env` file with your settings

For **local MongoDB**:
```env
MONGO_URI=mongodb://localhost:27017/uniglobal
JWT_SECRET=your_super_secret_key_change_this_in_production
ADMIN_EMAIL=admin@uniglobal.com
ADMIN_PASSWORD=your_initial_password
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

For **MongoDB Atlas**:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/uniglobal
JWT_SECRET=your_super_secret_key_change_this_in_production
ADMIN_EMAIL=admin@uniglobal.com
ADMIN_PASSWORD=your_initial_password
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

## Step 2: Start MongoDB

### Option A: Local MongoDB
```bash
# On Windows
mongod

# On Mac
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

### Option B: MongoDB Atlas
- No action needed, connection string is in `.env`

## Step 3: Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════════════╗
║          🎓 UNIGLOBAL BACKEND SERVER STARTED 🎓               ║
╠════════════════════════════════════════════════════════════════╣
║ Server URL: http://localhost:5000
...
```

## Step 4: Initialize Admin Account

Make a POST request to initialize the first admin:

```bash
curl -X POST http://localhost:5000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@uniglobal.com",
    "password": "securepassword123",
    "name": "Admin User"
  }'
```

Response:
```json
{
  "success": true,
  "message": "Admin initialized successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@uniglobal.com",
    "name": "Admin User"
  }
}
```

**Save this token** - you'll need it for authenticated requests.

## Step 5: Test the API

### Create a Lead (No Auth Required)
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "degree": "Bachelor",
    "preferredCountry": "Canada",
    "budget": "20-40L",
    "intake": "Fall 2025",
    "testScore": "IELTS 7.5"
  }'
```

### Get All Leads (Auth Required)
```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Dashboard Statistics (Auth Required)
```bash
curl -X GET http://localhost:5000/api/leads/stats/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Using Postman or REST Client

1. **Install REST Client** extension in VS Code
2. Create `requests.http` file:

```http
### Initialize Admin
POST http://localhost:5000/api/admin/init
Content-Type: application/json

{
  "email": "admin@uniglobal.com",
  "password": "securepassword123",
  "name": "Admin User"
}

### Login
POST http://localhost:5000/api/admin/login
Content-Type: application/json

{
  "email": "admin@uniglobal.com",
  "password": "securepassword123"
}

### Create Lead
POST http://localhost:5000/api/leads
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1 555-0100",
  "degree": "Master",
  "preferredCountry": "USA",
  "budget": "40-60L",
  "intake": "Spring 2025",
  "testScore": "GRE 320"
}

### Get All Leads
GET http://localhost:5000/api/leads
Authorization: Bearer <YOUR_TOKEN_HERE>

### Get Dashboard Stats
GET http://localhost:5000/api/leads/stats/dashboard
Authorization: Bearer <YOUR_TOKEN_HERE>
```

3. Click "Send Request" on each request

## Connecting Frontend to Backend

In your React/frontend (`App.tsx` or API config):

```typescript
const API_BASE_URL = 'http://localhost:5000/api';

// When submitting the form
const handleSubmitLead = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  console.log(data);
};

// Getting leads (with token)
const getLeads = async (token) => {
  const response = await fetch(`${API_BASE_URL}/leads`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.data;
};
```

## Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001

# Or kill process on port 5000
npx kill-port 5000
```

### MongoDB Connection Error
- Check if MongoDB is running
- Verify MONGO_URI in .env
- For MongoDB Atlas, whitelist your IP in network access settings

### CORS Error in Frontend
- Update CORS_ORIGIN in .env to include your frontend URL
- Example: `CORS_ORIGIN=http://localhost:3000,http://localhost:5173,https://yourdomain.com`

### JWT Token Expired
- Login again with `/api/admin/login` to get a new token
- Update JWT_EXPIRE in .env if needed

## Next Steps

1. ✅ Backend server running
2. ✅ Admin authentication working
3. ✅ Lead creation working
4. 🔜 Connect frontend forms to backend
5. 🔜 Configure WhatsApp notifications
6. 🔜 Deploy to production

## Support

For more details, see [README.md](./README.md) for full API documentation.

---

Happy coding! 🚀
