// JSON Storage Database Connection
// No external database needed - uses local JSON files

const connectDB = async () => {
  try {
    // JSON storage is initialized automatically when utils/storage.js is imported
    console.log(`JSON File Storage Initialized`);
    return { success: true };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
