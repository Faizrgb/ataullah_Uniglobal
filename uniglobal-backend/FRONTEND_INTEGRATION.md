# 🔗 Frontend Integration Guide

Complete guide for connecting your React frontend to the Uniglobal backend API.

## Table of Contents

1. [API Service Setup](#api-service-setup)
2. [Environment Configuration](#environment-configuration)
3. [Authentication Flow](#authentication-flow)
4. [Lead Form Integration](#lead-form-integration)
5. [Admin Dashboard Integration](#admin-dashboard-integration)
6. [Error Handling](#error-handling)

## API Service Setup

### Create API Service File

Create `src/services/api.ts`:

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Create Lead Service

Create `src/services/leadService.ts`:

```typescript
import apiClient from './api';

interface CreateLeadRequest {
  name: string;
  email: string;
  phone: string;
  degree?: string;
  country?: string;
  preferredCountry?: string;
  budget?: string;
  intake?: string;
  testScore?: string;
}

interface Lead extends CreateLeadRequest {
  _id: string;
  status: 'New' | 'Contacted' | 'Converted';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface LeadStats {
  summary: {
    totalLeads: number;
    newLeads: number;
    contactedLeads: number;
    convertedLeads: number;
    conversionRate: string;
  };
  countryDistribution: Array<{ _id: string; count: number }>;
  degreeDistribution: Array<{ _id: string; count: number }>;
}

export const createLead = async (data: CreateLeadRequest) => {
  return apiClient.post('/leads', data);
};

export const getAllLeads = async (filters?: {
  status?: string;
  degree?: string;
  country?: string;
  page?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.degree) params.append('degree', filters.degree);
  if (filters?.country) params.append('country', filters.country);
  if (filters?.page) params.append('page', String(filters.page));
  if (filters?.limit) params.append('limit', String(filters.limit));

  return apiClient.get(`/leads?${params.toString()}`);
};

export const getLeadById = async (id: string) => {
  return apiClient.get(`/leads/${id}`);
};

export const updateLead = async (
  id: string,
  data: Partial<{
    status: string;
    notes: string;
    degree: string;
    country: string;
    preferredCountry: string;
    budget: string;
    intake: string;
    testScore: string;
  }>
) => {
  return apiClient.put(`/leads/${id}`, data);
};

export const deleteLead = async (id: string) => {
  return apiClient.delete(`/leads/${id}`);
};

export const getLeadStats = async (): Promise<LeadStats> => {
  return apiClient.get('/leads/stats/dashboard');
};
```

### Create Admin Service

Create `src/services/adminService.ts`:

```typescript
import apiClient from './api';

interface LoginRequest {
  email: string;
  password: string;
}

interface InitializeRequest {
  email: string;
  password: string;
  name?: string;
}

interface AdminResponse {
  success: boolean;
  token: string;
  admin: {
    id: string;
    email: string;
    name: string;
  };
}

export const initializeAdmin = async (data: InitializeRequest): Promise<AdminResponse> => {
  return apiClient.post('/admin/init', data);
};

export const loginAdmin = async (data: LoginRequest): Promise<AdminResponse> => {
  return apiClient.post('/admin/login', data);
};

export const getAdminProfile = async () => {
  return apiClient.get('/admin/profile');
};

export const updateAdminProfile = async (data: { name: string }) => {
  return apiClient.put('/admin/profile', data);
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return apiClient.put('/admin/change-password', data);
};
```

## Environment Configuration

### `.env` File

Create `.env` in your frontend root:

```env
# Development
VITE_API_URL=http://localhost:5000/api

# Production
# VITE_API_URL=https://api.yourdomain.com/api
```

### Update `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
```

## Authentication Flow

### Context/Store Setup

Create `src/contexts/AuthContext.tsx`:

```typescript
import { createContext, useContext, useState, useEffect } from 'react';
import * as adminService from '@/services/adminService';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: (email: string, password: string, name?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved token on mount
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await adminService.loginAdmin({ email, password });
    setToken(response.token);
    localStorage.setItem('authToken', response.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const initialize = async (email: string, password: string, name?: string) => {
    const response = await adminService.initializeAdmin({
      email,
      password,
      name,
    });
    setToken(response.token);
    localStorage.setItem('authToken', response.token);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
        initialize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### Protected Routes

Create `src/components/ProtectedRoute.tsx`:

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{element}</>;
};
```

## Lead Form Integration

### Example Lead Form Component

Create `src/components/LeadForm.tsx`:

```typescript
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as leadService from '@/services/leadService';
import { useToast } from '@/hooks/use-toast';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  degree: string;
  preferredCountry: string;
  budget: string;
  intake: string;
  testScore?: string;
}

export const LeadForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: LeadFormData) => {
    try {
      setIsLoading(true);
      await leadService.createLead(data);
      
      toast({
        title: 'Success',
        description: 'Lead created successfully!',
      });
      
      reset();
    } catch (error: any) {
      const message =
        error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.message ||
        'Failed to create lead';
      
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="Your name"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          placeholder="your@email.com"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="phone">Phone *</label>
        <input
          id="phone"
          {...register('phone', { required: 'Phone is required' })}
          placeholder="+1 555-0100"
        />
        {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
      </div>

      <div>
        <label htmlFor="degree">Degree</label>
        <select {...register('degree')} id="degree">
          <option value="">Select degree</option>
          <option value="High School">High School</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Master">Master</option>
          <option value="PhD">PhD</option>
          <option value="Diploma">Diploma</option>
        </select>
      </div>

      <div>
        <label htmlFor="preferredCountry">Preferred Country</label>
        <input
          id="preferredCountry"
          {...register('preferredCountry')}
          placeholder="e.g., USA, Canada"
        />
      </div>

      <div>
        <label htmlFor="budget">Budget</label>
        <select {...register('budget')} id="budget">
          <option value="">Select budget</option>
          <option value="0-20L">0-20L</option>
          <option value="20-40L">20-40L</option>
          <option value="40-60L">40-60L</option>
          <option value="60L+">60L+</option>
        </select>
      </div>

      <div>
        <label htmlFor="intake">Intake</label>
        <select {...register('intake')} id="intake">
          <option value="">Select intake</option>
          <option value="Fall 2024">Fall 2024</option>
          <option value="Spring 2025">Spring 2025</option>
          <option value="Fall 2025">Fall 2025</option>
          <option value="Spring 2026">Spring 2026</option>
        </select>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
```

## Admin Dashboard Integration

### Dashboard Component

Create `src/pages/AdminDashboard.tsx`:

```typescript
import { useState, useEffect } from 'react';
import * as leadService from '@/services/leadService';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const [statsData, leadsData] = await Promise.all([
        leadService.getLeadStats(),
        leadService.getAllLeads({ limit: 10 }),
      ]);
      setStats(statsData);
      setLeads(leadsData.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <div className="text-sm text-gray-600">Total Leads</div>
          <div className="text-2xl font-bold">{stats?.summary?.totalLeads}</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded">
          <div className="text-sm text-gray-600">Converted</div>
          <div className="text-2xl font-bold">{stats?.summary?.convertedLeads}</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded">
          <div className="text-sm text-gray-600">Contacted</div>
          <div className="text-2xl font-bold">{stats?.summary?.contactedLeads}</div>
        </div>

        <div className="bg-purple-50 p-4 rounded">
          <div className="text-sm text-gray-600">Conversion Rate</div>
          <div className="text-2xl font-bold">{stats?.summary?.conversionRate}%</div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Recent Leads</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead: any) => (
              <tr key={lead._id} className="border-t">
                <td className="px-4 py-2">{lead.name}</td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.preferredCountry}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-sm font-medium
                    ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}
                  `}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

## Error Handling

### Global Error Handler

Create `src/utils/errorHandler.ts`:

```typescript
import axios from 'axios';

export const getErrorMessage = (error: any): string => {
  if (axios.isAxiosError(error)) {
    // Server responded with error status
    if (error.response?.data?.errors?.[0]?.message) {
      return error.response.data.errors[0].message;
    }
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.response?.status === 401) {
      return 'Authentication failed. Please login again.';
    }
    if (error.response?.status === 404) {
      return 'Resource not found.';
    }
    if (error.response?.status === 500) {
      return 'Server error. Please try again later.';
    }
  }

  // Network error
  if (!navigator.onLine) {
    return 'No internet connection. Please check your network.';
  }

  // Unknown error
  return error?.message || 'An unexpected error occurred';
};
```

### Authentication Check

```typescript
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import * as adminService from '@/services/adminService';

export const useAuthCheck = () => {
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) return;

    // Verify token is still valid
    const verifyToken = async () => {
      try {
        await adminService.getAdminProfile();
      } catch (error) {
        // Token is invalid or expired
        logout();
      }
    };

    verifyToken();
    
    // Check every 5 minutes
    const interval = setInterval(verifyToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [token, logout]);
};
```

## Example Full Setup

### Update `src/main.tsx`

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
```

### Update `src/App.tsx`

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LeadForm } from './components/LeadForm'
import { AdminDashboard } from './pages/AdminDashboard'
import { AdminLogin } from './pages/AdminLogin'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuthCheck } from './hooks/useAuthCheck'

function App() {
  useAuthCheck()
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeadForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={<ProtectedRoute element={<AdminDashboard />} />} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

---

Your backend and frontend are now connected! Test with the examples in [API_TESTING.md](./API_TESTING.md)
