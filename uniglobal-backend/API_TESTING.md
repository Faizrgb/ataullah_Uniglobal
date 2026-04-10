# 🧪 API Testing Guide

This guide provides comprehensive examples for testing the Uniglobal backend API.

## Table of Contents

1. [Health Check](#health-check)
2. [Admin Routes](#admin-routes)
3. [Lead Routes](#lead-routes)
4. [Error Scenarios](#error-scenarios)
5. [Postman Collection](#postman-collection)

## Health Check

### Check Server Status

**Request:**
```http
GET http://localhost:5000/api/health
```

**Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

## Admin Routes

### 1. Initialize Admin (First-time Setup)

**Endpoint:** `POST /api/admin/init`
**Authentication:** None (public endpoint)
**Description:** Create the first admin account

**Request:**
```bash
curl -X POST http://localhost:5000/api/admin/init \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@uniglobal.com",
    "password": "SecurePass123",
    "name": "Admin User"
  }'
```

**Request Body:**
```json
{
  "email": "admin@uniglobal.com",
  "password": "SecurePass123",
  "name": "Admin User"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Admin initialized successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTBhNDIxMjM0NTY3ODk...",
  "admin": {
    "id": "65a0a4212345678901234567",
    "email": "admin@uniglobal.com",
    "name": "Admin User"
  }
}
```

**Error (400 - Admin Already Exists):**
```json
{
  "success": false,
  "message": "Admin already exists. Contact existing admin for access."
}
```

### 2. Admin Login

**Endpoint:** `POST /api/admin/login`
**Authentication:** None
**Description:** Authenticate admin and get JWT token

**Request:**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@uniglobal.com",
    "password": "SecurePass123"
  }'
```

**Request Body:**
```json
{
  "email": "admin@uniglobal.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "65a0a4212345678901234567",
    "email": "admin@uniglobal.com",
    "name": "Admin User"
  }
}
```

**Error (401 - Invalid Credentials):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 3. Get Admin Profile

**Endpoint:** `GET /api/admin/profile`
**Authentication:** Required (JWT Token)
**Description:** Retrieve authenticated admin's profile

**Request:**
```bash
curl -X GET http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "65a0a4212345678901234567",
    "email": "admin@uniglobal.com",
    "name": "Admin User",
    "createdAt": "2024-01-15T08:00:00.000Z"
  }
}
```

### 4. Update Admin Profile

**Endpoint:** `PUT /api/admin/profile`
**Authentication:** Required (JWT Token)
**Description:** Update admin name

**Request:**
```bash
curl -X PUT http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Admin Name"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "65a0a4212345678901234567",
    "email": "admin@uniglobal.com",
    "name": "Updated Admin Name"
  }
}
```

### 5. Change Password

**Endpoint:** `PUT /api/admin/change-password`
**Authentication:** Required (JWT Token)
**Description:** Change admin password

**Request:**
```bash
curl -X PUT http://localhost:5000/api/admin/change-password \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "SecurePass123",
    "newPassword": "NewPass@456",
    "confirmPassword": "NewPass@456"
  }'
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error (401 - Wrong Current Password):**
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

## Lead Routes

### 1. Create Lead

**Endpoint:** `POST /api/leads`
**Authentication:** None (public)
**Description:** Submit a new lead from frontend form

**Request:**
```bash
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priya Kumar",
    "email": "priya.kumar@example.com",
    "phone": "+91 9876543210",
    "degree": "Master",
    "country": "India",
    "preferredCountry": "Canada",
    "budget": "20-40L",
    "intake": "Fall 2025",
    "testScore": "IELTS 7.5"
  }'
```

**Request Body:**
```json
{
  "name": "Priya Kumar",
  "email": "priya.kumar@example.com",
  "phone": "+91 9876543210",
  "degree": "Master",
  "country": "India",
  "preferredCountry": "Canada",
  "budget": "20-40L",
  "intake": "Fall 2025",
  "testScore": "IELTS 7.5"
}
```

**Valid Values for Enums:**
- `degree`: "High School", "Bachelor", "Master", "PhD", "Diploma"
- `budget`: "0-20L", "20-40L", "40-60L", "60L+", "Not specified"
- `intake`: "Fall 2024", "Spring 2025", "Fall 2025", "Spring 2026", "Not decided"

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "65a0b5a123456789abcdef01",
    "name": "Priya Kumar",
    "email": "priya.kumar@example.com",
    "phone": "+91 9876543210",
    "degree": "Master",
    "country": "India",
    "preferredCountry": "Canada",
    "budget": "20-40L",
    "intake": "Fall 2025",
    "testScore": "IELTS 7.5",
    "status": "New",
    "notes": "",
    "createdAt": "2024-01-15T10:15:00.000Z",
    "updatedAt": "2024-01-15T10:15:00.000Z",
    "__v": 0
  }
}
```

**Error (400 - Missing Required Field):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    }
  ]
}
```

### 2. Get All Leads (with Filters)

**Endpoint:** `GET /api/leads`
**Authentication:** Required (JWT Token)
**Description:** Retrieve all leads with optional filters and pagination

**Basic Request:**
```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**With Filters:**
```bash
curl -X GET "http://localhost:5000/api/leads?status=New&degree=Master&country=India&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Query Parameters:**
- `status` (optional): "New", "Contacted", "Converted"
- `degree` (optional): "High School", "Bachelor", "Master", "PhD", "Diploma"
- `country` (optional): Search substring
- `preferredCountry` (optional): Search substring
- `page` (optional): Page number, default 1
- `limit` (optional): Results per page, default 10, max 100
- `sortBy` (optional): Field name with - prefix for descending, default "-createdAt"

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a0b5a123456789abcdef01",
      "name": "Priya Kumar",
      "email": "priya.kumar@example.com",
      "phone": "+91 9876543210",
      "degree": "Master",
      "country": "India",
      "preferredCountry": "Canada",
      "budget": "20-40L",
      "intake": "Fall 2025",
      "status": "New",
      "createdAt": "2024-01-15T10:15:00.000Z",
      "updatedAt": "2024-01-15T10:15:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

### 3. Get Single Lead

**Endpoint:** `GET /api/leads/:id`
**Authentication:** Required (JWT Token)
**Description:** Retrieve a specific lead by ID

**Request:**
```bash
curl -X GET http://localhost:5000/api/leads/65a0b5a123456789abcdef01 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a0b5a123456789abcdef01",
    "name": "Priya Kumar",
    "email": "priya.kumar@example.com",
    "phone": "+91 9876543210",
    "degree": "Master",
    "country": "India",
    "preferredCountry": "Canada",
    "budget": "20-40L",
    "intake": "Fall 2025",
    "testScore": "IELTS 7.5",
    "status": "New",
    "notes": "",
    "createdAt": "2024-01-15T10:15:00.000Z",
    "updatedAt": "2024-01-15T10:15:00.000Z"
  }
}
```

**Error (404 - Not Found):**
```json
{
  "success": false,
  "message": "Lead not found"
}
```

### 4. Update Lead

**Endpoint:** `PUT /api/leads/:id`
**Authentication:** Required (JWT Token)
**Description:** Update lead information or status

**Request:**
```bash
curl -X PUT http://localhost:5000/api/leads/65a0b5a123456789abcdef01 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Contacted",
    "notes": "Called on 2024-01-15 at 2:30 PM. Student interested in Canada.",
    "testScore": "IELTS 8.0"
  }'
```

**Request Body (All Optional):**
```json
{
  "status": "Contacted",
  "degree": "Master",
  "country": "India",
  "preferredCountry": "UK",
  "budget": "40-60L",
  "intake": "Spring 2025",
  "testScore": "IELTS 8.0",
  "notes": "Called and discussed options"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "_id": "65a0b5a123456789abcdef01",
    "name": "Priya Kumar",
    "email": "priya.kumar@example.com",
    "phone": "+91 9876543210",
    "degree": "Master",
    "country": "India",
    "preferredCountry": "UK",
    "budget": "40-60L",
    "intake": "Spring 2025",
    "testScore": "IELTS 8.0",
    "status": "Contacted",
    "notes": "Called and discussed options",
    "createdAt": "2024-01-15T10:15:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

### 5. Delete Lead

**Endpoint:** `DELETE /api/leads/:id`
**Authentication:** Required (JWT Token)
**Description:** Remove a lead from database

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/leads/65a0b5a123456789abcdef01 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Lead deleted successfully",
  "data": {
    "_id": "65a0b5a123456789abcdef01",
    "name": "Priya Kumar",
    ...
  }
}
```

### 6. Get Dashboard Statistics

**Endpoint:** `GET /api/leads/stats/dashboard`
**Authentication:** Required (JWT Token)
**Description:** Get lead statistics and analytics

**Request:**
```bash
curl -X GET http://localhost:5000/api/leads/stats/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalLeads": 150,
      "newLeads": 85,
      "contactedLeads": 45,
      "convertedLeads": 20,
      "conversionRate": "13.33"
    },
    "countryDistribution": [
      {
        "_id": "Canada",
        "count": 45
      },
      {
        "_id": "USA",
        "count": 38
      },
      {
        "_id": "UK",
        "count": 32
      }
    ],
    "degreeDistribution": [
      {
        "_id": "Master",
        "count": 85
      },
      {
        "_id": "Bachelor",
        "count": 45
      },
      {
        "_id": "PhD",
        "count": 15
      }
    ]
  }
}
```

## Error Scenarios

### Invalid Email Format
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

### Missing Authentication Token
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### Invalid Token
```json
{
  "success": false,
  "message": "Not authorized to access this route",
  "error": "invalid signature"
}
```

### Validation Error - Multiple Fields
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "name",
      "message": "Name must be between 2 and 100 characters"
    },
    {
      "field": "phone",
      "message": "Valid phone number is required"
    }
  ]
}
```

## Postman Collection

### Import Collection

1. Create a new Collection in Postman
2. Add the following requests

### Environment Variables

Create an environment variable:
- `BASE_URL` = `http://localhost:5000`
- `TOKEN` = (will be set automatically after login)

### Sample Requests

```
@BASE_URL = http://localhost:5000
@TOKEN = 

### Initialize Admin
POST {{BASE_URL}}/api/admin/init
Content-Type: application/json

{
  "email": "admin@uniglobal.com",
  "password": "SecurePass123",
  "name": "Admin User"
}

### Login
POST {{BASE_URL}}/api/admin/login
Content-Type: application/json

{
  "email": "admin@uniglobal.com",
  "password": "SecurePass123"
}

### Create Lead
POST {{BASE_URL}}/api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555-0100",
  "degree": "Bachelor",
  "preferredCountry": "USA",
  "budget": "20-40L",
  "intake": "Fall 2025"
}

### Get All Leads
GET {{BASE_URL}}/api/leads
Authorization: Bearer {{TOKEN}}

### Get Dashboard Stats
GET {{BASE_URL}}/api/leads/stats/dashboard
Authorization: Bearer {{TOKEN}}
```

## Integration Testing

### Test Workflow

1. **Initialize Admin**
   - Call `/api/admin/init` with credentials
   - Save the returned token

2. **Create Sample Leads**
   - Call `/api/leads` multiple times with different data
   - Verify leads are created

3. **Retrieve and Filter**
   - Call `/api/leads` with various filters
   - Verify pagination works

4. **Update Leads**
   - Change lead status to "Contacted"
   - Then to "Converted"
   - Verify updates

5. **Check Statistics**
   - Call `/api/leads/stats/dashboard`
   - Verify numbers match

---

For more information, see [README.md](./README.md)
