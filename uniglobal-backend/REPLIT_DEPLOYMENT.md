# 🚀 QUICK DEPLOYMENT TO REPLIT

Your backend now uses **JSON File Storage** - no database setup needed!

## Deploy in 2 Minutes

### Step 1: Upload to GitHub

You need to have your code on GitHub (if not already):

1. Go to https://github.com/new
2. Create new repository: `uniglobal-backend`
3. Upload your backend code (drag & drop or use GitHub Desktop)

### Step 2: Deploy on Replit

1. Go to https://replit.com
2. Click **"+ Create"**
3. Select **"Import from GitHub"**
4. Paste your repo link: `https://github.com/YOUR_USERNAME/uniglobal-backend`
5. Click **"Import"**
6. Replit automatically detects Node.js project
7. Click **"Run"** (or just wait for auto-run)

### Step 3: Get Your Live URL

Once running, Replit gives you a URL like:
```
https://uniglobal-backend.YOUR_USERNAME.repl.co
```

**This is your backend URL!**

### Step 4: Update Frontend

In your React frontend, change API URL from:
```
http://localhost:5000/api
```

To:
```
https://uniglobal-backend.YOUR_USERNAME.repl.co/api
```

---

## What Changed?

✅ **Removed MongoDB** - Uses JSON files for storage
✅ **No database setup** - Works immediately on Replit
✅ **All APIs work the same** - Same endpoints, same functionality
✅ **Free forever** - No costs

## File Structure

```
data/
  ├── leads.json      # Stores all leads
  └── admin.json      # Stores admin account
```

---

## Testing Your Backend

Once deployed on Replit, test:

```bash
# Health check
curl https://your-replit-url/api/health

# Init admin
curl -X POST https://your-replit-url/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@uniglobal.com","password":"password123","name":"Admin"}'
```

---

## Need Help?

All API endpoints work exactly same as before!

Check [API_TESTING.md](./API_TESTING.md) for all examples.

---

**You're ready to deploy! 🎉**
