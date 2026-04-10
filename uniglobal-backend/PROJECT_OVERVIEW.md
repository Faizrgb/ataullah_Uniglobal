# 📋 PROJECT OVERVIEW

Complete overview of the Uniglobal Backend architecture and structure.

## 🎯 Project Summary

**Uniglobal Backend** is a production-ready Node.js API built with Express and MongoDB, designed to power the Uniglobal study abroad consultancy platform.

- **Type**: REST API Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Language**: JavaScript (ES6+)
- **Node Version**: 14+

## 🏗️ Architecture Overview

```
CLIENT (React Frontend)
         ↓
    API Requests (HTTP/CORS)
         ↓
    EXPRESS APP
    ├── Request Validation
    ├── Authentication
    └── Business Logic
         ↓
    CONTROLLERS
    ├── Lead Management
    └── Admin Management
         ↓
    SERVICES
    ├── WhatsApp Notifications
    └── External Integrations
         ↓
    MODELS (Mongoose Schemas)
    ├── Lead
    └── Admin
         ↓
    DATABASE (MongoDB)
```

## 📂 Complete Project Structure

```
uniglobal-backend/
│
├── config/
│   └── db.js                    # MongoDB connection configuration
│
├── models/
│   ├── Lead.js                  # Lead schema (student inquiries)
│   └── Admin.js                 # Admin schema (authentication)
│
├── controllers/
│   ├── leadController.js        # Lead CRUD & query logic
│   └── adminController.js       # Admin auth & profile logic
│
├── routes/
│   ├── leadRoutes.js           # Lead API endpoints
│   └── adminRoutes.js          # Admin API endpoints
│
├── middlewares/
│   ├── authMiddleware.js        # JWT verification
│   ├── errorHandler.js          # Centralized error handling
│   └── validationMiddleware.js  # Input validation & sanitization
│
├── services/
│   └── whatsappService.js       # WhatsApp notification service
│
├── utils/
│   └── logger.js                # Logging utility
│
├── app.js                       # Express app configuration
├── server.js                    # Server entry point & startup logic
├── package.json                 # Dependencies & scripts
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
│
├── README.md                    # Full documentation
├── QUICKSTART.md                # Quick setup guide
├── API_TESTING.md               # API testing examples
├── DEPLOYMENT.md                # Deployment guide
├── TROUBLESHOOTING.md           # Common issues & solutions
├── FRONTEND_INTEGRATION.md      # Frontend connection guide
└── PROJECT_OVERVIEW.md          # This file
```

## 🔑 Key Features

### 1. Lead Management System
- **Create Leads**: Public endpoint for lead submission from frontend
- **View Leads**: Retrieve all leads with advanced filtering
- **Update Status**: Track lead progression (New → Contacted → Converted)
- **Analytics**: Dashboard with lead statistics and distribution
- **Filters**: By country, degree, status, with pagination

### 2. Admin Authentication
- **Initial Setup**: `/api/admin/init` - Create first admin
- **Login**: JWT-based authentication
- **Profile Management**: View and update admin profile
- **Password Management**: Secure password change functionality
- **Session Management**: Token-based sessions

### 3. WhatsApp Notifications
- **Automatic Alerts**: Notify on new lead creation
- **Mock Mode**: Development without API credentials
- **Twilio Integration**: Production-ready WhatsApp sending
- **Customizable Messages**: Lead information in notifications

### 4. Security & Validation
- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Stateless authentication
- **CORS Protection**: Configurable cross-origin resource sharing
- **Input Validation**: express-validator for all inputs
- **Error Handling**: Centralized error middleware

### 5. Database Design

#### Lead Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String (required),
  degree: String (enum),           // High School, Bachelor, Master, PhD, Diploma
  country: String,
  preferredCountry: String,
  budget: String (enum),           // 0-20L, 20-40L, 40-60L, 60L+, Not specified
  intake: String (enum),           // Fall 2024, Spring 2025, Fall 2025, Spring 2026, Not decided
  testScore: String,
  status: String (default: "New"), // New, Contacted, Converted
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Admin Schema
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 📡 API Endpoints

### Lead Routes (Public & Protected)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/leads | ❌ | Create new lead |
| GET | /api/leads | ✅ | Get all leads (with filters) |
| GET | /api/leads/:id | ✅ | Get single lead |
| PUT | /api/leads/:id | ✅ | Update lead |
| DELETE | /api/leads/:id | ✅ | Delete lead |
| GET | /api/leads/stats/dashboard | ✅ | Get statistics |

### Admin Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/admin/init | ❌ | Initialize first admin |
| POST | /api/admin/login | ❌ | Admin login |
| GET | /api/admin/profile | ✅ | Get admin profile |
| PUT | /api/admin/profile | ✅ | Update profile |
| PUT | /api/admin/change-password | ✅ | Change password |

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Configuration
```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Run Server
```bash
npm run dev      # Development mode with auto-reload
npm start        # Production mode
```

### 4. Initialize Admin
```bash
POST /api/admin/init
{
  "email": "admin@uniglobal.com",
  "password": "secure_password",
  "name": "Admin User"
}
```

## 💾 Database Setup

### Local MongoDB
```bash
# Start MongoDB
mongod

# Or use package manager
brew services start mongodb-community   # Mac
sudo systemctl start mongod             # Linux
```

### MongoDB Atlas
1. Create account at mongodb.com
2. Create cluster
3. Get connection string
4. Update MONGO_URI in .env

## 🔒 Security Concepts

### JWT Authentication Flow
```
1. Admin logs in with email/password
2. Password is verified against hashed password
3. JWT token is generated with admin ID
4. Token is returned to frontend
5. Frontend includes token in Authorization header
6. Backend verifies token on protected routes
7. If token expires, admin must login again
```

### Password Security
```
1. Password is hashed using bcryptjs (10 salt rounds)
2. Original password is never stored
3. On login, entered password is compared with hash
4. Passwords are case-sensitive
5. No plain text passwords in logs or database
```

### Data Validation
```
Form Input → Validation Middleware → 
  ├── Check required fields ✓
  ├── Validate email format ✓
  ├── Validate phone format ✓
  ├── Check enum values ✓
  └── Sanitize input (trim, escape) ✓
→ Controller → Database
```

## 🧪 Testing the API

### Using curl:
```bash
# Create lead
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{...}'

# Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{...}'

# Get leads (with token)
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman:
1. Import requests from API_TESTING.md
2. Set environment variables (BASE_URL, TOKEN)
3. Send requests with "Send" button

### Using REST Client VS Code Extension:
1. Create `requests.http` file
2. Use examples from API_TESTING.md
3. Click "Send Request" on each request

## 📊 Data Flow Examples

### Lead Submission Flow
```
1. User fills form on frontend
2. Frontend sends POST /api/leads
3. Validation middleware checks data
4. leadController.createLead() processes
5. Lead is saved to MongoDB
6. WhatsApp notification service triggers
7. Response sent back to frontend
```

### Admin Management Flow
```
1. Admin logs in with email/password
2. Requests POST /api/admin/login
3. Admin is found in database
4. Password is verified
5. JWT token is generated
6. Token returned to frontend
7. Frontend stores token locally
8. Subsequent requests include token
9. authMiddleware verifies token
10. Request proceeds if valid
```

## ⚙️ Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| MONGO_URI | ✅ | N/A | MongoDB connection string |
| JWT_SECRET | ✅ | N/A | JWT signing key |
| JWT_EXPIRE | ❌ | 7d | Token expiration time |
| ADMIN_EMAIL | ✅ | N/A | Initial admin email |
| ADMIN_PASSWORD | ✅ | N/A | Initial admin password |
| PORT | ❌ | 5000 | Server port |
| NODE_ENV | ❌ | development | Environment mode |
| CORS_ORIGIN | ❌ | localhost:3000 | Allowed frontend origins |
| WHATSAPP_API_KEY | ❌ | N/A | Twilio API key |

## 📈 Scalability Considerations

### Current Setup (Development)
- Single server instance
- Local or Atlas MongoDB
- Mock WhatsApp service
- No caching layer

### Ready for Production
- Load balancing support
- Database replication
- API rate limiting (add express-rate-limit)
- Caching layer (Redis)
- Comprehensive logging (Winston, Morgan)
- Error tracking (Sentry)

### Future Enhancements
- Batch email notifications
- Lead scoring algorithms
- Integration with CRM systems
- Advanced analytics dashboard
- Lead assignment workflow
- Document management system

## 🎓 Learning Resources

### Understanding the Code

1. **app.js**: Express app setup, middleware, routing
2. **server.js**: Server startup, database connection, graceful shutdown
3. **models/**: Mongoose schema definitions, pre-hooks, methods
4. **controllers/**: Business logic, data manipulation, error handling
5. **routes/**: API endpoint definitions, middleware chains
6. **middlewares/**: Authentication, validation, error handling

### Key Concepts

- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB ODM (Object Data Modeling)
- **JWT**: Token-based authentication
- **Middleware**: Request processing between client and controller
- **Async/Await**: Promise-based async handling
- **REST**: Representational State Transfer architecture

## 🐛 Common Development Issues

### Port Already in Use
```bash
# Use different port
PORT=5001 npm run dev
```

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Verify MONGO_URI is correct
```

### CORS Error in Frontend
```bash
# Update CORS_ORIGIN to frontend URL
# Restart server after changing .env
```

### JWT Token Invalid
```bash
# Token is case-sensitive
# Token includes "Bearer " prefix
# Token must be in Authorization header
```

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Full API documentation & setup |
| QUICKSTART.md | Fast setup guide |
| API_TESTING.md | Detailed API examples |
| DEPLOYMENT.md | Production deployment guide |
| TROUBLESHOOTING.md | Problem solving |
| FRONTEND_INTEGRATION.md | React integration examples |
| PROJECT_OVERVIEW.md | This file |

## 🚀 Deployment Readiness

### Pre-Deployment
- [ ] All environment variables configured
- [ ] HTTPS/SSL enabled
- [ ] Database backups configured
- [ ] Monitoring setup
- [ ] Error tracking enabled

### Post-Deployment
- [ ] Health check endpoint verified
- [ ] Admin login working
- [ ] Lead creation working
- [ ] Admin dashboard accessible
- [ ] Notifications setup verified

## 📞 API Rate Limiting (Optional)

To add rate limiting, install:
```bash
npm install express-rate-limit
```

Then add to app.js:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 🔄 CI/CD Considerations

For automated deployment:

1. **GitHub Actions**: Automated testing & deployment
2. **Docker**: Containerize application
3. **Tests**: Add test suite (Jest, Mocha)
4. **Linting**: Add ESLint, Prettier
5. **Pre-hooks**: Prevent bad code from being committed

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01-15 | Initial release with core features |

## License

ISC License - See package.json

## Support

- Check documentation files
- Review troubleshooting guide
- Check API examples in API_TESTING.md
- Review error messages in console

---

**Ready to get started?** See [QUICKSTART.md](./QUICKSTART.md) for setup instructions!
