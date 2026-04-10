# 🚀 DEPLOYMENT GUIDE

Complete guide for deploying Uniglobal backend to production.

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Hosting Options](#hosting-options)
3. [Deployment Steps](#deployment-steps)
4. [Production Checklist](#production-checklist)
5. [Monitoring & Maintenance](#monitoring--maintenance)

## Environment Setup

### Production `.env` Example

```env
# Database
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/uniglobal?retryWrites=true&w=majority

# JWT
JWT_SECRET=use_a_very_long_random_string_here_min_32_chars_use_openssl_rand_-base64_32
JWT_EXPIRE=7d

# Admin
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=use_a_strong_password_change_immediately

# Server
PORT=5000
NODE_ENV=production

# CORS - Update with your frontend domain
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com

# WhatsApp (Optional)
WHATSAPP_API_KEY=your_twilio_api_key
WHATSAPP_ACCOUNT_SID=your_twilio_account_id
```

### Generate Secure JWT Secret

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Hosting Options

### Option 1: Heroku (Easiest)

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps

1. **Login to Heroku**
```bash
heroku login
```

2. **Create new app**
```bash
heroku create uniglobal-backend
```

3. **Add MongoDB Atlas URL**
```bash
heroku config:set MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/uniglobal
heroku config:set JWT_SECRET=your_long_random_secret_here
heroku config:set ADMIN_EMAIL=admin@yourdomain.com
heroku config:set ADMIN_PASSWORD=strong_password
heroku config:set CORS_ORIGIN=https://yourdomain.com
heroku config:set NODE_ENV=production
```

4. **Deploy**
```bash
git push heroku main
# or
git push heroku master
```

5. **View logs**
```bash
heroku logs -t
```

6. **Visit your app**
```bash
heroku open
```

### Option 2: Railway (Fast & Simple)

#### Steps

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Deploy from GitHub repo
4. Add environment variables
5. Build automatically starts

### Option 3: Render

#### Steps

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect to GitHub
4. Set environment variables
5. Deploy

### Option 4: DigitalOcean App Platform

#### Steps

1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Create new App
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Option 5: AWS EC2 (Scalable)

#### Prerequisites
- AWS account
- EC2 instance running Node.js
- MongoDB Atlas

#### Steps

1. **Launch EC2 Instance**
   - Choose Ubuntu 22.04
   - Configure security groups
   - Allow ports: 22 (SSH), 5000 (API)

2. **SSH into server**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

3. **Install dependencies**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clone repository**
```bash
git clone your-repo-url
cd uniglobal-backend
npm install
```

5. **Configure environment**
```bash
nano .env
# Add your production environment variables
```

6. **Install PM2 (process manager)**
```bash
sudo npm install -g pm2
```

7. **Start application**
```bash
pm2 start server.js --name "uniglobal-backend"
pm2 startup
pm2 save
```

8. **Setup Nginx reverse proxy**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

9. **Enable SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Deployment Steps

### Step 1: Pre-deployment Checklist

- [ ] Update `.env` with production values
- [ ] Change JWT_SECRET
- [ ] Change ADMIN_PASSWORD
- [ ] Update CORS_ORIGIN
- [ ] Set NODE_ENV=production
- [ ] Test locally with production config
- [ ] Backup database
- [ ] Document rollback procedure

### Step 2: Database Migration

```bash
# Test connection
node -e "require('mongoose').connect(process.env.MONGO_URI).then(() => console.log('Connected!'))"

# Initialize admin if first deployment
# Call POST /api/admin/init on deployed app
```

### Step 3: Deploy Application

**For Git-based deployment (Heroku, Railway, etc.):**
```bash
git add .
git commit -m "Production deployment"
git push origin main
```

**For SSH-based (AWS, VPS):**
```bash
ssh into server
cd app-directory
git pull
npm install
pm2 restart all
```

### Step 4: Verify Deployment

```bash
# Test health endpoint
curl https://your-api-domain.com/api/health

# Test login
curl -X POST https://your-api-domain.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@yourdomain.com","password":"password"}'
```

## Production Checklist

### Security
- [ ] Enable HTTPS/SSL
- [ ] Use strong JWT_SECRET (min 32 chars)
- [ ] Strong ADMIN_PASSWORD
- [ ] MongoDB IP whitelist configured
- [ ] CORS restricted to frontend domain only
- [ ] API rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection protection (using Mongoose)

### Performance
- [ ] Enable gzip compression
- [ ] Add Redis caching (optional)
- [ ] Optimize database indexes
- [ ] Use CDN for static files
- [ ] Monitor response times

### Monitoring
- [ ] Setup error logging (e.g., Sentry)
- [ ] Setup uptime monitoring
- [ ] Configure alerts
- [ ] Monitor database usage
- [ ] Monitor server resources

### Backup & Recovery
- [ ] Daily database backups
- [ ] Backup retention policy (30 days)
- [ ] Test restore procedure
- [ ] Document recovery steps

### Documentation
- [ ] Update API documentation
- [ ] Document deployment process
- [ ] Create runbook for incidents
- [ ] Document rollback procedure

## Monitoring & Maintenance

### Setup Error Tracking (Sentry)

1. Create account at [sentry.io](https://sentry.io)
2. Create new project
3. Install SDK:
```bash
npm install @sentry/node
```

4. Add to your app:
```javascript
import Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Setup Uptime Monitoring

Use services like:
- UptimeRobot (free tier)
- StatusCake
- Pingdom

Configure to monitor:
```
https://your-api-domain.com/api/health
```

### Regular Maintenance Tasks

**Weekly:**
- Check error logs
- Review performance metrics
- Verify backups

**Monthly:**
- Update dependencies: `npm update`
- Review security advisories: `npm audit`
- Database optimization

**Quarterly:**
- Major version updates
- Security audit
- Performance optimization

### Database Maintenance

```bash
# MongoDB optimization
db.leads.createIndex({ "createdAt": -1 })
db.leads.createIndex({ "email": 1 })
db.leads.createIndex({ "status": 1 })
db.admin.createIndex({ "email": 1 }, { unique: true })
```

### Scaling Considerations

If traffic increases:

1. **Add load balancer** (Nginx, HAProxy)
2. **Use Redis** for session/cache
3. **Implement database replication**
4. **Use CDN** for static content
5. **Horizontal scaling** with multiple instances

### Rollback Procedure

If deployment fails:

```bash
# View deployment history
git log --oneline -10

# Rollback to previous version
git revert HEAD
git push heroku main

# Or restore from backup
# Connect to previous database backup
# Restore application from git tag
git checkout v1.0.0
git push heroku HEAD:main --force
```

## Cost Optimization

- **MongoDB**: Use MongoDB Atlas free tier (512MB) or pay-as-you-go
- **Hosting**: Start with free tier (Heroku, Railway) or $5/month VPS
- **Estimate**: $10-50/month depending on traffic

## Support & Resources

- Hosting platform documentation
- Node.js deployment guides
- MongoDB Atlas help
- Nginx documentation

---

For more information, see [README.md](./README.md)
