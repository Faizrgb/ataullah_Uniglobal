import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import * as storage from './utils/storage.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Start server
const startServer = async () => {
  try {
    // Initialize storage (JSON files)
    await connectDB();
    logger.success('JSON File Storage initialized successfully');

    // Start Express server
    const server = app.listen(PORT, () => {
      logger.success(`Server running on port ${PORT} in ${NODE_ENV} mode`);
      console.log(`
╔════════════════════════════════════════════════════════════════╗
║          🎓 UNIGLOBAL BACKEND SERVER STARTED 🎓               ║
╠════════════════════════════════════════════════════════════════╣
║ Server URL: http://localhost:${PORT}                           ║
║ Environment: ${NODE_ENV}                                        ║
║ Storage: JSON File Storage (data/ folder)                       ║
║                                                                 ║
║ API Endpoints:                                                  ║
║  POST   /api/leads               - Create lead                 ║
║  GET    /api/leads               - Get all leads (protected)    ║
║  GET    /api/leads/:id           - Get lead (protected)         ║
║  PUT    /api/leads/:id           - Update lead (protected)      ║
║  DELETE /api/leads/:id           - Delete lead (protected)      ║
║  GET    /api/leads/stats/dashboard - Stats (protected)          ║
║                                                                 ║
║  POST   /api/admin/init          - Initialize admin            ║
║  POST   /api/admin/login         - Admin login                 ║
║  GET    /api/admin/profile       - Get profile (protected)      ║
║  PUT    /api/admin/profile       - Update profile (protected)   ║
║  PUT    /api/admin/change-password - Change password (protected)║
╚════════════════════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.warning('SIGTERM received, shutting down gracefully');
      server.close(() => {
        logger.success('Server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.warning('SIGINT received, shutting down gracefully');
      server.close(() => {
        logger.success('Server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
