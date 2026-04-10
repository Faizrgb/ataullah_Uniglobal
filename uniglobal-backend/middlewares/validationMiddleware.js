import { validationResult, body, query } from 'express-validator';

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

// Lead creation validation
const validateLead = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\+?[\d\s\-\(\)]{7,}$/)
    .withMessage('Valid phone number is required'),
  body('degree')
    .optional()
    .trim()
    .isIn(['High School', 'Bachelor', 'Master', 'PhD', 'Diploma'])
    .withMessage('Invalid degree'),
  body('country')
    .optional()
    .trim(),
  body('preferredCountry')
    .optional()
    .trim(),
  body('budget')
    .optional()
    .trim()
    .isIn(['0-20L', '20-40L', '40-60L', '60L+', 'Not specified'])
    .withMessage('Invalid budget'),
  body('intake')
    .optional()
    .trim()
    .isIn(['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026', 'Not decided'])
    .withMessage('Invalid intake'),
  body('testScore')
    .optional()
    .trim(),
  handleValidationErrors,
];

// Lead update validation
const validateLeadUpdate = [
  body('status')
    .optional()
    .trim()
    .isIn(['New', 'Contacted', 'Converted'])
    .withMessage('Invalid status'),
  body('notes')
    .optional()
    .trim(),
  body('degree')
    .optional()
    .trim()
    .isIn(['High School', 'Bachelor', 'Master', 'PhD', 'Diploma'])
    .withMessage('Invalid degree'),
  body('budget')
    .optional()
    .trim()
    .isIn(['0-20L', '20-40L', '40-60L', '60L+', 'Not specified'])
    .withMessage('Invalid budget'),
  body('intake')
    .optional()
    .trim()
    .isIn(['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026', 'Not decided'])
    .withMessage('Invalid intake'),
  handleValidationErrors,
];

// Admin login validation
const validateAdminLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  handleValidationErrors,
];

// Query filters validation for leads
const validateLeadFilters = [
  query('status')
    .optional()
    .isIn(['New', 'Contacted', 'Converted'])
    .withMessage('Invalid status'),
  query('degree')
    .optional()
    .isIn(['High School', 'Bachelor', 'Master', 'PhD', 'Diploma'])
    .withMessage('Invalid degree'),
  query('country')
    .optional()
    .trim(),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors,
];

export {
  validateLead,
  validateLeadUpdate,
  validateAdminLogin,
  validateLeadFilters,
  handleValidationErrors,
};
