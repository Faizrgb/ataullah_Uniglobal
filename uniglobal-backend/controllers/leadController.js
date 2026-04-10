import * as storage from '../utils/storage.js';
import sendWhatsAppNotification from '../services/whatsappService.js';

// @desc    Create a new lead
// @route   POST /api/leads
// @access  Public
export const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, degree, country, preferredCountry, budget, intake, testScore } =
      req.body;

    // Create lead object
    const leadData = {
      name,
      email,
      phone,
      degree,
      country,
      preferredCountry,
      budget,
      intake,
      testScore,
    };

    const lead = storage.createLead(leadData);

    // Send WhatsApp notification (non-blocking)
    sendWhatsAppNotification(lead).catch((err) => {
      console.error('WhatsApp notification failed:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all leads with filters
// @route   GET /api/leads
// @access  Private (Admin)
export const getAllLeads = async (req, res, next) => {
  try {
    const { status, degree, country, preferredCountry, page = 1, limit = 10, sortBy = '-createdAt' } =
      req.query;

    const filters = {
      status,
      degree,
      country,
      preferredCountry,
      page: parseInt(page, 10),
      limit: Math.min(parseInt(limit, 10), 100),
      sortBy,
    };

    const result = storage.getAllLeads(filters);

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single lead by ID
// @route   GET /api/leads/:id
// @access  Private (Admin)
export const getLeadById = async (req, res, next) => {
  try {
    const lead = storage.getLeadById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
// @access  Private (Admin)
export const updateLead = async (req, res, next) => {
  try {
    const { status, degree, country, preferredCountry, budget, intake, testScore, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (degree) updateData.degree = degree;
    if (country) updateData.country = country;
    if (preferredCountry) updateData.preferredCountry = preferredCountry;
    if (budget) updateData.budget = budget;
    if (intake) updateData.intake = intake;
    if (testScore) updateData.testScore = testScore;
    if (notes) updateData.notes = notes;

    const lead = storage.updateLead(req.params.id, updateData);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin)
export const deleteLead = async (req, res, next) => {
  try {
    const lead = storage.deleteLead(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get lead statistics/dashboard
// @route   GET /api/leads/stats/dashboard
// @access  Private (Admin)
export const getLeadStats = async (req, res, next) => {
  try {
    const stats = storage.getLeadStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
