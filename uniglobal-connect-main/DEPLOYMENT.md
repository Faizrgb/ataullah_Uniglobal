# Deployment Guide

Complete guide to deploy both frontend and backend.

## Step 1: Prepare Code for GitHub

### Backend Folder: `uniglobal-backend/`
- ✅ JSON storage (no database needed)
- ✅ Ready to deploy
- ✅ All dependencies installed

### Frontend Folder: `uniglobal-connect-main/`
- ✅ Connected to backend API
- ✅ Environment variables configured
- ✅ Ready to deploy

---

## Step 2: Create GitHub Repository

### Create Main Repo Structure

1. Go to https://github.com/new
2. Create repository: `uniglobal-consultancy`
3. Clone locally or follow GitHub instructions

---

## Step 3: Organize Folders

Your final GitHub repo should look like:

```
uniglobal-consultancy/
├── backend/                    (your backend folder)
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/                   (your frontend folder)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── README.md                   (main project readme)
└── .gitignore
```

---

## Step 4: Push to GitHub

### From Command Line:

```bash
# Navigate to your repo
cd uniglobal-consultancy

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Uniglobal backend and frontend"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/uniglobal-consultancy.git

# Push
git branch -M main
git push -u origin main
```

---

## Step 5: Deploy Backend on Replit

### 5.1: Create Backend Repo on Replit

1. Go to https://replit.com
2. Click **"+ Create"**
3. Select **"Import from GitHub"**
4. Enter GitHub URL: `https://github.com/YOUR_USERNAME/uniglobal-consultancy`
5. **Important**: Replit will ask which folder - select **`backend`**
6. Wait for import...
7. Click **"Run"** button

### 5.2: Get Backend URL

Once running, Replit shows URL like:
```
https://uniglobal-consultancy.YOUR_USERNAME.repl.co
```

**Save this URL!**

---

## Step 6: Deploy Frontend on Vercel

### Using GitHub (Easiest):

1. Go to https://vercel.com
2. Click **"+ New Project"**
3. Select GitHub repo: `uniglobal-consultancy`
4. **Set Root Directory**: `frontend`
5. **Environment Variables**:
   ```
   VITE_API_URL=https://uniglobal-consultancy.YOUR_USERNAME.repl.co/api
   ```
6. Click **"Deploy"**
7. Wait for deployment...

### Your Frontend URL:
```
https://uniglobal-consultancy.vercel.app
```

---

## Step 7: Verify Everything Works

### Test Backend Health Check:
```bash
curl https://uniglobal-consultancy.YOUR_USERNAME.repl.co/api/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2024-04-10T...",
  "environment": "production"
}
```

### Test Frontend:
1. Go to: `https://uniglobal-consultancy.vercel.app`
2. Fill the lead form
3. Submit
4. Should get success message ✅

---

## Final Checklist

### Backend (Replit)
- [ ] Running on Replit
- [ ] Has live URL
- [ ] Health check returns OK
- [ ] Can init admin account

### Frontend (Vercel)
- [ ] Deployed on Vercel
- [ ] Has live URL
- [ ] Points to correct backend URL
- [ ] Forms submit successfully

### GitHub Repository
- [ ] Both folders pushed
- [ ] `.env` files in gitignore
- [ ] `.git` working correctly
- [ ] All code visible on GitHub

---

## 🎉 Success!

Your application is now deployed:

- **Frontend**: https://uniglobal-consultancy.vercel.app
- **Backend**: https://uniglobal-consultancy.YOUR_USERNAME.repl.co
- **GitHub**: https://github.com/YOUR_USERNAME/uniglobal-consultancy

---

## Live Demo Commands

### Initialize Admin:
```bash
curl -X POST https://uniglobal-consultancy.YOUR_USERNAME.repl.co/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@uniglobal.com",
    "password": "SecurePassword123",
    "name": "Admin"
  }'
```

### Show to Client:
1. Open frontend URL
2. Fill form as a lead
3. Show success message
4. (Optional) Show backend admin dashboard concept

---

## Post-Deployment

### Update Custom Domain (Optional)

1. Buy domain (Godaddy, Namecheap, etc.)
2. Update DNS to point to Vercel/Replit
3. Configure in Vercel/Replit dashboard

### Monitor Usage

- **Replit**: Check dashboard for activity
- **Vercel**: Check analytics for traffic
- **Backend**: Logs show form submissions

---

**Everything ready for client presentation! 🚀**
