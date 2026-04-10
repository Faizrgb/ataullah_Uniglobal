import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize JSON files if they don't exist
const initializeFiles = () => {
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(ADMIN_FILE)) {
    fs.writeFileSync(ADMIN_FILE, JSON.stringify({}, null, 2));
  }
};

initializeFiles();

// ============ LEADS STORAGE ============

export const readLeads = () => {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeLeads = (leads) => {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
};

export const createLead = (leadData) => {
  const leads = readLeads();
  const newLead = {
    _id: Date.now().toString(),
    ...leadData,
    status: 'New',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  leads.push(newLead);
  writeLeads(leads);
  return newLead;
};

export const getAllLeads = (filters = {}) => {
  let leads = readLeads();

  // Apply filters
  if (filters.status) {
    leads = leads.filter((l) => l.status === filters.status);
  }
  if (filters.degree) {
    leads = leads.filter((l) => l.degree === filters.degree);
  }
  if (filters.country) {
    leads = leads.filter((l) =>
      l.country?.toLowerCase().includes(filters.country.toLowerCase())
    );
  }
  if (filters.preferredCountry) {
    leads = leads.filter((l) =>
      l.preferredCountry?.toLowerCase().includes(filters.preferredCountry.toLowerCase())
    );
  }

  // Apply sorting
  const sortBy = filters.sortBy || '-createdAt';
  const isDesc = sortBy.startsWith('-');
  const field = sortBy.replace('-', '');

  leads.sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    if (aVal < bVal) return isDesc ? 1 : -1;
    if (aVal > bVal) return isDesc ? -1 : 1;
    return 0;
  });

  // Apply pagination
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const skip = (page - 1) * limit;

  const paginatedLeads = leads.slice(skip, skip + limit);

  return {
    data: paginatedLeads,
    total: leads.length,
    page,
    limit,
    totalPages: Math.ceil(leads.length / limit),
  };
};

export const getLeadById = (id) => {
  const leads = readLeads();
  return leads.find((l) => l._id === id);
};

export const updateLead = (id, updates) => {
  const leads = readLeads();
  const index = leads.findIndex((l) => l._id === id);

  if (index === -1) {
    return null;
  }

  leads[index] = {
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeLeads(leads);
  return leads[index];
};

export const deleteLead = (id) => {
  const leads = readLeads();
  const index = leads.findIndex((l) => l._id === id);

  if (index === -1) {
    return null;
  }

  const deleted = leads.splice(index, 1);
  writeLeads(leads);
  return deleted[0];
};

export const getLeadStats = () => {
  const leads = readLeads();
  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const convertedLeads = leads.filter((l) => l.status === 'Converted').length;

  // Country distribution
  const countryMap = {};
  leads.forEach((lead) => {
    const country = lead.preferredCountry || 'Not specified';
    countryMap[country] = (countryMap[country] || 0) + 1;
  });

  const countryDistribution = Object.entries(countryMap)
    .map(([country, count]) => ({
      _id: country,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Degree distribution
  const degreeMap = {};
  leads.forEach((lead) => {
    const degree = lead.degree || 'Not specified';
    degreeMap[degree] = (degreeMap[degree] || 0) + 1;
  });

  const degreeDistribution = Object.entries(degreeMap).map(([degree, count]) => ({
    _id: degree,
    count,
  }));

  return {
    summary: {
      totalLeads: total,
      newLeads,
      contactedLeads,
      convertedLeads,
      conversionRate: total > 0 ? ((convertedLeads / total) * 100).toFixed(2) : '0',
    },
    countryDistribution,
    degreeDistribution,
  };
};

// ============ ADMIN STORAGE ============

export const readAdmin = () => {
  try {
    const data = fs.readFileSync(ADMIN_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const writeAdmin = (adminData) => {
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(adminData, null, 2));
};

export const adminExists = () => {
  const admin = readAdmin();
  return admin && admin.email;
};

export const createAdmin = (email, passwordHash, name) => {
  const admin = {
    _id: Date.now().toString(),
    email,
    password: passwordHash,
    name: name || 'Admin',
    createdAt: new Date().toISOString(),
  };
  writeAdmin(admin);
  return admin;
};

export const getAdminByEmail = (email) => {
  const admin = readAdmin();
  if (admin && admin.email === email) {
    return admin;
  }
  return null;
};

export const updateAdminProfile = (updates) => {
  const admin = readAdmin();
  if (!admin) return null;

  const updated = {
    ...admin,
    ...updates,
  };
  writeAdmin(updated);
  return updated;
};
