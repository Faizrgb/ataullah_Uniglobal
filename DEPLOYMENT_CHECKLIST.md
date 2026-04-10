# 🚀 Deployment Checklist

Complete checklist for deploying both backend and frontend to production.

---

## Phase 1: Pre-Deployment Check (Local)

### Backend
- [ ] Navigate to `backend` folder: `cd backend`
- [ ] Verify `.env` file exists with:
  ```
  PORT=5000
  JWT_SECRET=your-secret-key
  NODE_ENV=development
  ```
- [ ] Run tests: `npm run dev`
- [ ] Verify output shows: `🎓 UNIGLOBAL BACKEND SERVER STARTED`
- [ ] Check health endpoint: `curl http://localhost:5000/api/health`
- [ ] Stop server: Ctrl+C

### Frontend
- [ ] Navigate to `frontend` folder: `cd frontend`
- [ ] Verify `.env.local` exists with:
  ```
  VITE_API_URL=http://localhost:5000/api
  ```
- [ ] Run tests: `npm run dev`
- [ ] Open http://localhost:5173 in browser
- [ ] Form should be visible
- [ ] Stop server: Ctrl+C

### End-to-End Test (Both Running)
- [ ] Start backend: `npm run dev` in `backend` folder (Terminal 1)
- [ ] Start frontend: `npm run dev` in `frontend` folder (Terminal 2)
- [ ] Open http://localhost:5173
- [ ] Fill form with test data:
  ```
  Degree: Master's
  Country: USA
  Budget: ₹20-30 Lakh
  Intake: Fall 2025
  Name: Test User
  Email: test@example.com
  Phone: +1 555-0100
  ```
- [ ] Click "Continue" on last step
- [ ] Verify success message appears
- [ ] Check `backend/data/leads.json` has the lead
- [ ] Stop both servers

---

## Phase 2: Push to GitHub

### Create Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: `uniglobal-consultancy`
- [ ] Description: "Full-stack study abroad consultancy platform"
- [ ] Public repository
- [ ] Click "Create repository"

### Push Code
```bash
# Navigate to parent folder containing both backend and frontend
cd "C:\Users\faiz\Desktop\C++ Code practice\CONSULTANCY  - ataullah"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Uniglobal platform with React frontend and Node backend"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/uniglobal-consultancy.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Verify on GitHub
- [ ] Navigate to your repository URL
- [ ] Verify you can see:
  - [ ] `README.md` (main documentation)
  - [ ] `DEPLOYMENT.md` (deployment guide)
  - [ ] `frontend/` folder with all files
  - [ ] `backend/` folder with all files
  - [ ] Both `.env` files are in `.gitignore` (not visible)

---

## Phase 3: Deploy Backend on Replit

### Create Replit Project
- [ ] Go to https://replit.com
- [ ] Click **"+ Create"** button
- [ ] Select **"Import from GitHub"**
- [ ] Enter URL: `https://github.com/YOUR_USERNAME/uniglobal-consultancy`
- [ ] Replit will ask which folder - **Select `backend`**
- [ ] Wait for import to complete (~30 seconds)

### Run Backend
- [ ] In Replit, click **"Run"** button
- [ ] Wait for startup message:
  ```
  🎓 UNIGLOBAL BACKEND SERVER STARTED
  Server running on port 5000
  ```
- [ ] Check in browser address bar - should show:
  ```
  https://uniglobal-consultancy.YOUR_USERNAME.repl.co
  ```
- [ ] Test health endpoint in DevTools console:
  ```javascript
  fetch('your-repl-url/api/health').then(r => r.json()).then(console.log)
  ```

### Get Backend URL (IMPORTANT!)
- [ ] Save this URL somewhere safe:
  ```
  https://uniglobal-consultancy.YOUR_USERNAME.repl.co
  ```
- [ ] This is your production backend URL
- [ ] You'll need it in the next step

### Initialize Admin Account
- [ ] In terminal/PowerShell, run:
  ```bash
  curl -X POST https://uniglobal-consultancy.YOUR_USERNAME.repl.co/api/admin/init \
    -H "Content-Type: application/json" \
    -d '{
      "email": "admin@uniglobal.com",
      "password": "SecurePassword123",
      "name": "Administrator"
    }'
  ```
- [ ] Should return: `"Admin account created successfully"`

---

## Phase 4: Deploy Frontend on Vercel

### Create Vercel Deployment
- [ ] Go to https://vercel.com
- [ ] Click **"Add New"** → **"Project"**
- [ ] Click **"Import Git Repository"**
- [ ] Select GitHub repo: `uniglobal-consultancy`
- [ ] Click **"Import"**

### Configure Frontend
- [ ] **Project Name**: `uniglobal-consultancy` (should be auto-filled)
- [ ] **Framework**: `Other` (Vite is not auto-detected)
- [ ] **Root Directory**: Change to `frontend`
- [ ] Click **"Edit"** next to Root Directory
- [ ] Enter: `frontend`
- [ ] **Build Command**: Keep default (`npm run build`)

### Set Environment Variables
- [ ] Under **Environment Variables**, add:
  ```
  Name: VITE_API_URL
  Value: https://uniglobal-consultancy.YOUR_USERNAME.repl.co/api
  ```
  (Replace YOUR_USERNAME with your actual Replit username)
- [ ] Click **"Add"**

### Deploy
- [ ] Click **"Deploy"** button
- [ ] Wait for deployment (~2-3 minutes)
- [ ] Should see ✅ "Deployment Successful"
- [ ] Your frontend URL:
  ```
  https://uniglobal-consultancy.vercel.app
  ```

### Verify Deployment
- [ ] Go to https://uniglobal-consultancy.vercel.app
- [ ] Page should load with form visible
- [ ] Try filling and submitting form
- [ ] Should show success message

---

## Phase 5: Final Verification

### Test Complete Flow
- [ ] Open: https://uniglobal-consultancy.vercel.app
- [ ] Fill form:
  ```
  Degree: Bachelor's
  Country: UK
  Budget: ₹10-20 Lakh
  Intake: Spring 2026
  Name: Demo Client
  Email: client@demo.com
  Phone: +44 20 7123 4567
  ```
- [ ] Click "Continue"
- [ ] Verify success message: ✅ "Thank you! Our counsellor will contact you shortly."
- [ ] Form should reset

### Check Backend Data
- [ ] Go to Replit project running your backend
- [ ] Check `data/leads.json` file
- [ ] Should see the lead you just submitted:
  ```json
  {
    "id": "lead-...",
    "name": "Demo Client",
    "email": "client@demo.com",
    "phone": "+44 20 7123 4567",
    "degree": "Bachelor",
    "country": "UK",
    "preferredCountry": "UK",
    "budget": "10-20L",
    "intake": "Spring 2026",
    "createdAt": "2024-04-10T..."
  }
  ```

### Test Admin Login
- [ ] Open Replit admin panel (if available)
- [ ] Or test via curl:
  ```bash
  curl -X POST https://uniglobal-consultancy.YOUR_USERNAME.repl.co/api/admin/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "admin@uniglobal.com",
      "password": "SecurePassword123"
    }'
  ```
- [ ] Should return a JWT token

---

## Phase 6: Client Demonstration

### URLs Ready for Demo
- [ ] **Frontend Demo**: https://uniglobal-consultancy.vercel.app
- [ ] **Backend Health**: https://uniglobal-consultancy.YOUR_USERNAME.repl.co/api/health
- [ ] **GitHub Repository**: https://github.com/YOUR_USERNAME/uniglobal-consultancy

### Demo Talking Points
1. **Show them the landing page** - The clean, professional interface
2. **Explain the form flow** - Multi-step experience with smooth animations
3. **Submit a test lead** - Show real-time form validation and success message
4. **Show backend integration** - Explain that data is saved immediately
5. **Mention scalability** - Can add more features to the API
6. **Future features** - Admin dashboard, email notifications, analytics

---

## Troubleshooting

### Form Not Submitting
**Problem**: Form submission fails or shows error
- [ ] Verify backend URL is correct in frontend environment
- [ ] Check browser console for errors (F12 → Console tab)
- [ ] Check Replit backend is running
- [ ] Restart Replit backend if needed

### Backend Not Running
**Problem**: Replit shows "Cannot GET /api/health"
- [ ] Go to Replit project
- [ ] Click "Run" button again
- [ ] Check console output for error messages
- [ ] Verify `.env` file has JWT_SECRET

### GitHub Push Failed
**Problem**: Git push command gives error
- [ ] Verify SSH key is configured: `ssh -T git@github.com`
- [ ] Or use HTTPS with Personal Access Token
- [ ] Retry: `git push -u origin main`

### CORS Errors
**Problem**: Frontend cannot reach backend API
- [ ] Verify backend CORS is enabled for Vercel domain
- [ ] Check backend logs in Replit for CORS errors
- [ ] Verify environment variables on Vercel

---

## Success Checklist ✅

Complete all of these:

- [ ] GitHub repository has both `frontend/` and `backend/` folders
- [ ] Backend running on Replit with accessible URL
- [ ] Frontend deployed on Vercel with correct backend URL
- [ ] Admin account initialized on backend
- [ ] Test form submission works end-to-end
- [ ] Success message appears after form submission
- [ ] Lead data saved in backend `data/leads.json`
- [ ] Documentation (README.md, This file) in GitHub

---

## After Deployment

### Maintenance
- Monitor Replit console for errors
- Check Vercel analytics for traffic
- Review submitted leads regularly
- Update backend if needed (Replit auto-pulls from GitHub)

### Scaling Up
- Add admin dashboard UI to frontend
- Add email notifications for leads
- Add analytics dashboard
- Add more countries/universities
- Implement payment integration for services

### Documentation
- All guides provided in repository
- Inline code comments explain functionality
- API endpoints documented in backend README
- Deployment steps documented

---

**Total Setup Time**: ~30 minutes  
**Status**: Ready for client demo! 🎉

---

Need help? Check:
1. [README.md](../../README.md) - Main documentation
2. [backend/BACKEND_README.md](../../backend/BACKEND_README.md) - Backend guide
3. [frontend/FRONTEND_README.md](../../frontend/FRONTEND_README.md) - Frontend guide

---

**Good luck with your client presentation! 🚀**
