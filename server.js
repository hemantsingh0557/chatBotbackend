const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const scraper = require('./scraper/scraper'); // Import the scraper
const cron = require('node-cron'); // Import cron for periodic tasks
const chatbotRoutes = require('./routes/chatbotRoutes'); // Import routes

dotenv.config(); // Load environment variables

const app = express();
const port = 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection setup
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Run the scraper to collect data on server start
scraper();

// Setup cron job to update the scraped data every 5 days
cron.schedule('0 0 */5 * *', async () => {
  console.log('Running scraper to update data...');
  await scraper();
});

// Define the chatbot routes
app.use('/api/chatbot', chatbotRoutes);

// Basic health check route to test server
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running and working fine!' });
});

// Define another route to test the scraper functionality
app.get('/test-scraper', async (req, res) => {
  try {
    await scraper();
    res.status(200).json({ message: 'Scraper executed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error executing scraper', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
