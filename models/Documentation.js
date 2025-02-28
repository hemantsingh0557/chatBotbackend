const mongoose = require('mongoose');

// Define the schema for the scraped data
const documentationSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    },
    rawData: {
      type: String, // Store the raw HTML content or any relevant data scraped from the website
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now, // Track when the data was last updated
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the model based on the schema
const Documentation = mongoose.model('Documentation', documentationSchema);

module.exports = Documentation;
