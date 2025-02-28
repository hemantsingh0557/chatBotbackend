const express = require('express');
const { getAnswer } = require('../controllers/chatbotController');

const router = express.Router();

// Route to handle the user question
router.post('/ask', getAnswer);

module.exports = router;
