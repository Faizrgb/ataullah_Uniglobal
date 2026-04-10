# 🎓 Uniglobal - Study Abroad Consultancy Platform

Complete full-stack application for study abroad consultancy services. Built with modern web technologies, deployed on Replit (backend) and Vercel (frontend).

## 🚀 Live Demo

- **Frontend**: https://uniglobal-consultancy.vercel.app
- **Backend API**: https://uniglobal-backend.repl.co

---

## 📁 Project Structure

```
uniglobal-consultancy/
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── services/
│   │   │   └── api.ts         # Backend API client
│   │   ├── hooks/             # Custom React hooks
│   │   └── lib/               # Utilities
│   ├── package.json
│   ├── vite.config.ts         # Vite configuration
│   ├── FRONTEND_README.md     # Frontend-specific guide
│   └── DEPLOYMENT.md          # Deployment instructions
│
├── backend/
│   ├── src/
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API endpoints
│   │   ├── config/            # Configuration
│   │   ├── middleware/        # Auth & other middleware
│   │   └── utils/
│   │       └── storage.js     # JSON file storage
│   ├── server.js              # Express app
│   ├── package.json
│   ├── BACKEND_README.md      # Backend-specific guide
│   └── data/
│       ├── leads.json         # Submitted leads
│       └── admin.json         # Admin accounts
│
├── README.md                  # This file
└── DEPLOYMENT.md              # Full deployment guide
```

---

## 🎯 Features

### Frontend
✅ **Modern UI** - Built with React, TypeScript, Tailwind CSS  
✅ **Multi-step Form** - Lead capture with validation  
✅ **Responsive Design** - Mobile-friendly  
✅ **Smooth Animations** - Framer Motion  
✅ **Toast Notifications** - Sonner  

### Backend
✅ **RESTful API** - Express.js  
✅ **Lead Management** - CRUD operations  
✅ **Admin Authentication** - JWT + bcrypt  
✅ **JSON Storage** - No database required  
✅ **Error Handling** - Centralized responses  

---

## 🛠️ Tech Stack

### Frontend
- **React** 18 + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **Shadcn UI** - Component library
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **JSON** - Data storage

---

## 📋 Quick Start

### Prerequisites
- Node.js 16+ installed
- Git

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/uniglobal-consultancy
cd uniglobal-consultancy
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

Server runs on: `http://localhost:5000`

### 3. Frontend Setup (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

### 4. Test the Application

1. Open http://localhost:5173 in browser
2. Fill the lead form with test data:
   ```
   Name: John Doe
   Email: john@example.com
   Phone: +1 555-0100
   Degree: Master's
   Country: USA
   Budget: $40-60K
   Intake: Fall 2025
   ```
3. Click "Continue" → You should see a success message
4. Check `backend/data/leads.json` to verify data was saved

---

## 📚 API Documentation

### Health Check
```bash
GET /api/health
```

### Create Lead (No Auth Required)
```bash
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
```

### Admin Login
```bash
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@uniglobal.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "admin": {
      "id": "admin-001",
      "name": "Administrator",
      "email": "admin@uniglobal.com"
    }
  }
}
```

### Get All Leads (Admin Only)
```bash
GET /api/leads
Authorization: Bearer {token}
```

**Full API docs**: See [backend/BACKEND_README.md](backend/BACKEND_README.md)

---

## 🚀 Deployment

### Deploy Backend on Replit

1. Push code to GitHub
2. Go to https://replit.com
3. Click **"Import from GitHub"**
4. Enter repository URL
5. For root directory, select: `backend`
6. Click **"Run"**

**Backend URL**: `https://uniglobal-backend.YOUR_USERNAME.repl.co`

### Deploy Frontend on Vercel

1. Go to https://vercel.com
2. Click **"Import Project"** → Select GitHub repo
3. Set **Root Directory**: `frontend`
4. Add **Environment Variable**:
   ```
   VITE_API_URL=https://uniglobal-backend.YOUR_USERNAME.repl.co/api
   ```
5. Click **"Deploy"**

**Frontend URL**: `https://uniglobal-consultancy.vercel.app`

**Full deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🔐 First-Time Admin Setup

After deploying backend, initialize admin account:

```bash
curl -X POST https://uniglobal-backend.YOUR_USERNAME.repl.co/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@uniglobal.com",
    "password": "ChangeMeToSecurePassword123",
    "name": "Administrator"
  }'
```

---

## 📁 File Structure Details

### Frontend Components
- **Navbar** - Navigation with mobile menu
- **LeadForm** - Multi-step form (integrated with backend)
- **StatsSection** - Statistics display
- **ServicesSection** - Services showcase
- **CountriesSection** - Supported countries
- **TestimonialsSection** - Client testimonials
- **CTASection** - Call-to-action section
- **Footer** - Footer with links
- **Chatbot** - Floating chatbot

### Backend Controllers
- **leadController** - Lead CRUD logic
- **adminController** - Admin authentication

### Backend Routes
- `/api/leads` - Lead endpoints
- `/api/admin` - Admin authentication endpoints
- `/api/health` - Health check

---

## 🧪 Testing

### Test Backend Locally

```bash
cd backend
npm run dev

# In another terminal
curl http://localhost:5000/api/health
```

### Test Frontend Locally

```bash
cd frontend
npm run dev

# Open http://localhost:5173 in browser
```

### Test Form Submission

1. Frontend running on localhost:5173
2. Backend running on localhost:5000
3. Fill form and submit
4. Check browser console for API response
5. Check `backend/data/leads.json` for persisted data

---

## 🐛 Troubleshooting

### Frontend Form Not Submitting

**Check:**
1. Is backend running? `http://localhost:5000/api/health`
2. Is `.env.local` correct? Should be: `VITE_API_URL=http://localhost:5000/api`
3. Check browser console for errors
4. Check Network tab in DevTools

### Backend Not Starting

**Check:**
1. Is Node.js installed? `node --version`
2. Are dependencies installed? `npm install`
3. Is `.env` file present?
4. Is port 5000 available? (Check with `lsof -i :5000`)

### Deployment Issues

See [DEPLOYMENT.md](DEPLOYMENT.md) for troubleshooting section.

---

## 📖 Detailed Guides

- **Frontend**: [frontend/FRONTEND_README.md](frontend/FRONTEND_README.md)
- **Backend**: [backend/BACKEND_README.md](backend/BACKEND_README.md)
- **Deployment**: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🎬 Demo Flow

1. **User visits website** → `https://uniglobal-consultancy.vercel.app`
2. **User fills lead form** (name, email, phone, degree, country, budget, intake)
3. **Form submission** → API call to `https://uniglobal-backend.repl.co/api/leads`
4. **Backend receives lead** → Validates and saves to `data/leads.json`
5. **Frontend shows success** → Toast notification: "Thank you! Our counsellor will contact you shortly."
6. **Admin can login** → `POST /api/admin/login` with email & password
7. **Admin sees leads** → `GET /api/leads` returns all submitted leads with admin token

---

## 🔐 Security Notes

⚠️ **For Production:**
- Change `JWT_SECRET` in backend `.env`
- Use HTTPS everywhere
- Enable CORS properly for your domain
- Use environment-based configuration
- Regular security audits

**Passwords** are hashed with bcryptjs (never stored in plain text).

---

## 📊 Data Persistence

All data stored in JSON files:
- **leads.json** - Submitted leads (unlimited)
- **admin.json** - Admin accounts (multiple admins supported)

Files auto-created on first run in `backend/data/` folder.

---

## 📄 License

ISC

---

## 👤 Author

Created by Faiz Ataullah for Uniglobal Consultancy

---

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review detailed guides in respective folders
3. Check backend/frontend console logs
4. Verify environment variables

---

## ✅ Deployment Checklist

Before showing to client:

- [ ] Backend deployed on Replit and running
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured
- [ ] Admin account initialized
- [ ] Test form submission end-to-end
- [ ] Verify leads appear in backend after submission
- [ ] Check both URLs are accessible
- [ ] Test on mobile device

---

## 🚀 Ready to Deploy?

Follow this order:
1. Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. Deploy backend on Replit
3. Deploy frontend on Vercel
4. Initialize admin account
5. Test complete flow
6. Show to client!

**Estimated time: 15-20 minutes**

---

**Version**: 1.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅

---

**Questions? Check the documentation files or run locally first!**
