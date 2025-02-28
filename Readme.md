
---

# Chatbot Backend API

## Description

This backend API is designed to support a chatbot that answers **"how-to"** questions related to four popular **Customer Data Platforms (CDPs)**: **Segment**, **mParticle**, **Lytics**, and **Zeotap**. The chatbot extracts relevant information from the official documentation of these platforms to guide users on how to perform tasks or achieve specific outcomes within each platform.

The backend is responsible for receiving the user's questions, querying the appropriate data sources, and providing accurate and helpful responses. Additionally, the backend includes a cron job that periodically scrapes updated documentation to keep the information current.

## Features

- **API Endpoint**: 
  - `POST /api/chatbot/ask`: Receives a question and returns an appropriate answer based on the documentation from the selected CDPs.
  
- **Cron Job**: 
  - Periodically scrapes the official documentation of Segment, mParticle, Lytics, and Zeotap to keep the chatbot's knowledge base updated.

## Technologies Used

- **Node.js** – JavaScript runtime for building the server.
- **Express** – Web framework for Node.js.
- **MongoDB** (optional) – NoSQL database for storing scraped data.
- **Puppeteer** – For scraping data from the official CDP documentation websites.
- **node-cron** – For scheduling periodic scraping tasks to update data.
- **dotenv** – For managing environment variables.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGODB_URI=<your-mongo-uri>   # MongoDB URI if you're using MongoDB
   ```

4. Start the server:
   ```bash
   npm start
   ```
   The backend will now be available at `http://localhost:5000`.

---
