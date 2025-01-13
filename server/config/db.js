// server/config/db.js
const mongoose = require('mongoose');
const uri = 'mongodb+srv://brad193026:hocCmKOHSajxRYyO@hirehubweb.pvnmg.mongodb.net/?retryWrites=true&w=majority&appName=HireHubWeb'; 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
