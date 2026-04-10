# 🎓 Uniglobal Backend

A production-ready backend for the Uniglobal study abroad consultancy platform. Built with Node.js, Express, and MongoDB.

## Features

✅ Lead generation and management
✅ Admin authentication with JWT
✅ WhatsApp notifications
✅ CRM functionality
✅ Comprehensive API with validation
✅ Error handling and logging
✅ CORS support for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing

## Installation

### 1. Clone and Setup

```bash
cd uniglobal-backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/uniglobal

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Admin Configuration
ADMIN_EMAIL=admin@uniglobal.com
ADMIN_PASSWORD=secure_password_here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# Optional WhatsApp Configuration
WHATSAPP_API_KEY=your_api_key_here
WHATSAPP_ACCOUNT_SID=your_account_sid_here
```

### 3. Database Setup

Make sure MongoDB is running locally or configure MongoDB Atlas URI:

```bash
# For MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/uniglobal
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

## API Documentation

### Lead Endpoints

#### Create Lead (Public)
```
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "degree": "Bachelor",
  "preferredCountry": "Canada",
  "budget": "20-40L",
  "intake": "Fall 2025",
  "testScore": "IELTS 7.5"
}
```

#### Get All Leads (Protected)
```
GET /api/leads?status=New&degree=Bachelor&country=India&page=1&limit=10
Authorization: Bearer <token>
```

#### Get Single Lead (Protected)
```
GET /api/leads/:id
Authorization: Bearer <token>
```

#### Update Lead (Protected)
```
PUT /api/leads/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Contacted",
  "notes": "Called on 2024-01-15"
}
```

#### Delete Lead (Protected)
```
DELETE /api/leads/:id
Authorization: Bearer <token>
```

#### Get Dashboard Statistics (Protected)
```
GET /api/leads/stats/dashboard
Authorization: Bearer <token>
```

### Admin Endpoints

#### Initialize Admin (First-time Setup)
```
POST /api/admin/init
Content-Type: application/json

{
  "email": "admin@uniglobal.com",
  "password": "secure_password",
  "name": "Admin"
}
```

#### Login
```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@uniglobal.com",
  "password": "secure_password"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "...",
    "email": "admin@uniglobal.com",
    "name": "Admin"
  }
}
```

#### Get Profile (Protected)
```
GET /api/admin/profile
Authorization: Bearer <token>
```

#### Update Profile (Protected)
```
PUT /api/admin/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Admin Name"
}
```

#### Change Password (Protected)
```
PUT /api/admin/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "old_password",
  "newPassword": "new_password",
  "confirmPassword": "new_password"
}
```

## Project Structure

```
uniglobal-backend/
├── config/           # Database configuration
│   └── db.js
├── models/          # Mongoose schemas
│   ├── Lead.js
│   └── Admin.js
├── controllers/     # Business logic
│   ├── leadController.js
│   └── adminController.js
├── routes/          # API routes
│   ├── leadRoutes.js
│   └── adminRoutes.js
├── middlewares/     # Express middlewares
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── validationMiddleware.js
├── services/        # External services
│   └── whatsappService.js
├── utils/           # Helper functions
│   └── logger.js
├── app.js           # Express app
├── server.js        # Server entry point
├── package.json     # Dependencies
├── .env.example     # Environment variables template
└── README.md        # This file
```

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication.

1. **Initialize Admin**: First, create admin credentials via `/api/admin/init`
2. **Login**: Use `/api/admin/login` to get a JWT token
3. **Protected Routes**: Include the token in the Authorization header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

## WhatsApp Notifications

The backend supports WhatsApp notifications on new lead creation.

### Configuration Options:

1. **Mock Mode** (Development): Console logs the notification
2. **Twilio Integration** (Production): Send actual WhatsApp messages

To enable Twilio:
- Get API credentials from Twilio
- Configure environment variables
- Uncomment Twilio code in `services/whatsappService.js`

## Validation

All inputs are validated using `express-validator`:

- **Lead fields**: Name, Email, Phone (required), Degree, Country, Budget, Intake
- **Admin fields**: Email, Password (min 6 chars)
- **Query filters**: Pagination, sorting, filtering

## Error Handling

Centralized error handling middleware catches and formats errors:

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## Security Features

✅ Password hashing with bcryptjs
✅ JWT-based authentication
✅ CORS protection
✅ Input validation and sanitization
✅ SQL injection prevention (MongoDB)
✅ Environment variable protection

## Development

### Adding New Endpoints

1. Create controller in `controllers/`
2. Create routes in `routes/`
3. Add validation in `middlewares/validationMiddleware.js`
4. Import routes in `app.js`

### Adding New Models

1. Create schema in `models/`
2. Use in controllers
3. Add indexes for performance

## Deployment

### Prerequisites
- Node.js >= 14
- MongoDB instance
- Environment variables configured

### Steps

1. Install dependencies: `npm install`
2. Configure `.env` file
3. Run migrations if needed
4. Start server: `npm start`

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET
- [ ] Configure MongoDB Atlas
- [ ] Enable HTTPS
- [ ] Set up WhatsApp API
- [ ] Configure CORS for production domain
- [ ] Set up monitoring/logging
- [ ] Enable security headers

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

ISC

## Support

For issues and questions, please contact the development team.

---

**Made with ❤️ by Uniglobal Team**
