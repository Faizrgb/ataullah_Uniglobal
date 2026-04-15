let rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
rawApiUrl = rawApiUrl.replace(/\/+$/, '');
if (!rawApiUrl.endsWith('/api')) {
  rawApiUrl += '/api';
}
const API_BASE_URL = rawApiUrl;

export const apiClient = {
  async post(endpoint: string, data: any, token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  },

  async get(endpoint: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  },

  async put(endpoint: string, data: any, token?: string) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  },

  async delete(endpoint: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  },
};

// Lead API
export const leadsAPI = {
  create: (data: any) => apiClient.post('/leads', data),
  getAll: (token: string, filters: any = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.degree) params.append('degree', filters.degree);
    if (filters.country) params.append('country', filters.country);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    return apiClient.get(`/leads?${params.toString()}`, token);
  },
  getById: (id: string, token: string) => apiClient.get(`/leads/${id}`, token),
  update: (id: string, data: any, token: string) => apiClient.put(`/leads/${id}`, data, token),
  delete: (id: string, token: string) => apiClient.delete(`/leads/${id}`, token),
  getStats: (token: string) => apiClient.get('/leads/stats/dashboard', token),
};

// Admin API
export const adminAPI = {
  init: (email: string, password: string, name?: string) =>
    apiClient.post('/admin/init', { email, password, name }),
  login: (email: string, password: string) => apiClient.post('/admin/login', { email, password }),
  getProfile: (token: string) => apiClient.get('/admin/profile', token),
  updateProfile: (name: string, token: string) => apiClient.put('/admin/profile', { name }, token),
  changePassword: (currentPassword: string, newPassword: string, token: string) =>
    apiClient.put('/admin/change-password', { currentPassword, newPassword, confirmPassword: newPassword }, token),
};
