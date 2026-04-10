# 🔧 TROUBLESHOOTING GUIDE

Common issues and their solutions.

## Startup Issues

### Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution 1: Kill Process on Port**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

**Solution 2: Use Different Port**
```bash
# Update .env file
PORT=5001

# Or set via environment
$env:PORT=5001; npm run dev  # PowerShell
PORT=5001 npm run dev        # bash
```

### Module Not Found

**Error:**
```
Cannot find module 'express'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Failed

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Causes & Solutions:**

1. **MongoDB not running:**
```bash
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

2. **Wrong MongoDB URI:**
```env
# Local MongoDB
MONGO_URI=mongodb://localhost:27017/uniglobal

# MongoDB Atlas - check credentials
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/uniglobal

# Issues:
# - Double-check username and password (special chars need URL encoding)
# - IP whitelist (for MongoDB Atlas)
# - Database name matches
```

3. **Firewall blocking:**
```bash
# Windows Firewall - allow MongoDB
# Mac - check System Preferences > Security
# Linux - sudo ufw allow 27017
```

## Authentication Issues

### Invalid JWT Token

**Error:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**Solutions:**
1. Token is missing from header
```bash
# Include Authorization header
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/leads
```

2. Token format is wrong
```bash
# Correct format: Bearer <token>
# Wrong: Token <token> or no Bearer
# Wrong: Authorization: <token>
```

3. Token is expired
```bash
# Login again to get new token
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@uniglobal.com","password":"password"}'
```

4. JWT_SECRET changed
```bash
# If you change JWT_SECRET, all tokens become invalid
# Users need to login again
# Keep JWT_SECRET consistent
```

### Login Fails with Valid Credentials

**Error:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Solutions:**
1. Clear cache and try again
2. Admin doesn't exist - need to initialize:
```bash
curl -X POST http://localhost:5000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@uniglobal.com",
    "password": "securepassword",
    "name": "Admin"
  }'
```

3. Check database has admin record:
```bash
# In MongoDB
use uniglobal
db.admins.findOne()
```

## Validation Issues

### Lead Creation Fails

**Error:**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

**Solutions:**

1. **Invalid email format:**
```json
{
  "email": "not-an-email"  // Wrong
}
{
  "email": "user@example.com"  // Correct
}
```

2. **Missing required field:**
```json
{
  "name": "John",
  "email": "john@example.com",
  "phone": "+1 555-0100"  // All three required
}
```

3. **Invalid phone format:**
```json
{
  "phone": "123"  // Too short, wrong format
}
{
  "phone": "+1 555-0100"  // Correct
}
```

4. **Invalid enum value:**
```json
{
  "degree": "InvalidDegree"  // Wrong
}
{
  "degree": "Master"  // Correct options: High School, Bachelor, Master, PhD, Diploma
}
```

## CORS Issues

### Frontend Requests Blocked

**Error in Browser Console:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/leads' from origin 
'http://localhost:5173' has been blocked by CORS policy
```

**Solutions:**

1. **Update CORS_ORIGIN in .env:**
```env
# Wrong - missing quotes/syntax
CORS_ORIGIN=http://localhost:5173

# Correct format
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Multiple domains
CORS_ORIGIN=http://localhost:5173,http://localhost:3000,https://yourdomain.com
```

2. **Restart server after changing .env:**
```bash
# Changes to .env are not hot-reloaded
# Stop (Ctrl+C) and restart
npm run dev
```

3. **Check frontend URL matches:**
```bash
# If frontend runs on different port
CORS_ORIGIN=http://localhost:5173

# Check if frontend is opening dashboard from different port
# Both must match exactly
```

## Database Issues

### Duplicate Key Error

**Error:**
```
E11000 duplicate key error
```

**Cause:** Unique index violation

**Solution:**
```bash
# Check and drop duplicate indexes
use uniglobal
db.admins.collection.dropIndex("email_1")

# Or recreate collection
db.leads.deleteMany({})

# Update: Email is not unique for leads, so shouldn't happen
```

### Data Not Persisting

**Issues:**

1. **Using in-memory database accidentally**
```bash
# Check MONGO_URI
# Should NOT start with 'memory://'
```

2. **Transactions not committed**
```bash
# Make sure you call save() or create()
const lead = await Lead.create(data);  // Creates
// vs
const lead = new Lead(data);
await lead.save();  // Also creates
```

3. **Wrong database**
```bash
# Check you're querying correct collection
# MongoDB is case-sensitive for database names
MONGO_URI=mongodb://localhost:27017/uniglobal  # Correct
MONGO_URI=mongodb://localhost:27017/Uniglobal  # Different database!
```

## Performance Issues

### Slow Response Times

**Solutions:**

1. **Add database indexes:**
```bash
# In MongoDB
use uniglobal

# Create indexes for frequently queried fields
db.leads.createIndex({ "createdAt": -1 })
db.leads.createIndex({ "email": 1 })
db.leads.createIndex({ "status": 1 })
db.leads.createIndex({ "country": 1 })
db.admin.createIndex({ "email": 1 }, { unique: true })
```

2. **Limit query results:**
```bash
# Don't return all records
GET /api/leads?page=1&limit=20

# Use filtering
GET /api/leads?status=New&degree=Master
```

3. **Monitor database performance:**
```bash
# Check query times
# Use MongoDB Atlas monitoring
# Review indexes
```

### High Memory Usage

**Solutions:**
1. Increase Node.js memory:
```bash
node --max-old-space-size=4096 server.js
```

2. Check for memory leaks:
```bash
# Monitor process
node --inspect server.js
# Open chrome://inspect
```

## White Screen / Blank Response

**Error:**
```
GET /api/leads 500 Internal Server Error
```

**Debugging:**

1. **Check server logs:**
```bash
# Look at console output
# Should show error message
```

2. **Enable debug mode:**
```env
NODE_ENV=development
```

3. **Check error middleware:**
```bash
# Error handler middleware should catch all errors
# If not showing, check it's added to app.js
```

4. **Test health endpoint:**
```bash
curl http://localhost:5000/api/health
# Should return { "status": "OK" }
```

## Specific Error Messages

### "Lead not found"

```bash
# Check ID format is valid MongoDB ObjectId
# Should be 24 character hex string
# Example: 65a0b5a123456789abcdef01

# Check lead actually exists
# GET /api/leads to see all leads
```

### "Admin already exists"

```bash
# Can't call /api/admin/init if admin already exists
# Must use /api/admin/login instead
# If you forgot password, need to delete admin from DB:

# In MongoDB
use uniglobal
db.admins.deleteOne({ email: "admin@uniglobal.com" })
# Then you can initialize again
```

### "Current password is incorrect"

```bash
# Double-check you're entering current password correctly
# Passwords are case-sensitive
# Any typo will fail
```

## Testing Connectivity

### Test from Command Line

```bash
# Test server is running
curl http://localhost:5000/api/health

# Test public endpoint
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"+1 555-0100"}'

# Test protected endpoint (without token - should fail)
curl http://localhost:5000/api/leads \
  -H "Authorization: Bearer invalid"

# Test with valid token
curl http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Getting Help

### Collect Debug Info

When something fails, gather:
1. **Full error message** (copy from console)
2. **Request details** (curl command or Postman screenshot)
3. **Server logs** (console output)
4. **.env values** (without passwords)
5. **Database connection test result**

### Common Commands for Troubleshooting

```bash
# Check if MongoDB is running
mongo --version

# Check if Node is installed
node --version

# Check network connectivity
ping google.com

# Check if port is available
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# View all npm packages
npm list

# Check for security issues
npm audit

# Clean install
rm -rf node_modules package-lock.json
npm install

# Run with debug output
NODE_DEBUG=* npm run dev
```

## Getting More Help

1. **Check logs carefully** - Most errors are explained
2. **Try the examples** in API_TESTING.md
3. **Test with curl** before testing with frontend
4. **Review the source code** - Comments explain logic
5. **Check MongoDB documentation** - For database issues
6. **Review Express.js docs** - For routing/middleware issues

---

If you still have issues, double-check:
- ✅ MongoDB is running
- ✅ .env file is correct
- ✅ Server started without errors
- ✅ Using correct endpoints
- ✅ Authorization headers included
- ✅ Request body is valid JSON

Still stuck? Check [README.md](./README.md) or backend source code comments.
