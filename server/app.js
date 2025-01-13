require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes'); 
const reviewRoutes = require('./routes/reviewRoutes'); 
const salaryRoutes = require('./routes/salaryRoutes');
const companyRoutes = require('./routes/companyRoutes');
const newsRoutes = require('./routes/newsRoutes');

// Connect to MongoDB
connectDB();

const app = express();
const path = require('path');

// Serve the React app's build folder
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());
app.use(express.json());

// Define routes here
app.use('/api', jobRoutes);
app.use('/api', userRoutes); 
app.use('/api', reviewRoutes); 
app.use('/api/salary', salaryRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api', newsRoutes); 

// Catch-all route for serving the frontend index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
