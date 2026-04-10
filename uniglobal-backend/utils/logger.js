// Simple logger utility

const logger = {
  info: (message, data = '') => {
    console.log(`ℹ️ [INFO] ${message}`, data);
  },
  success: (message, data = '') => {
    console.log(`✅ [SUCCESS] ${message}`, data);
  },
  error: (message, error = '') => {
    console.error(`❌ [ERROR] ${message}`, error);
  },
  warning: (message, data = '') => {
    console.warn(`⚠️ [WARNING] ${message}`, data);
  },
  debug: (message, data = '') => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🐛 [DEBUG] ${message}`, data);
    }
  },
};

export default logger;
