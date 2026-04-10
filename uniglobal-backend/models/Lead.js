import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      unique: false, // Allow multiple leads with same email
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      trim: true,
    },
    degree: {
      type: String,
      enum: ['High School', 'Bachelor', 'Master', 'PhD', 'Diploma'],
      default: 'Bachelor',
    },
    country: {
      type: String,
      default: '',
    },
    preferredCountry: {
      type: String,
      default: '',
    },
    budget: {
      type: String,
      enum: ['0-20L', '20-40L', '40-60L', '60L+', 'Not specified'],
      default: 'Not specified',
    },
    intake: {
      type: String,
      enum: ['Fall 2024', 'Spring 2025', 'Fall 2025', 'Spring 2026', 'Not decided'],
      default: 'Not decided',
    },
    testScore: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Converted'],
      default: 'New',
    },
    notes: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Update the updatedAt field before saving
leadSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Lead', leadSchema);
