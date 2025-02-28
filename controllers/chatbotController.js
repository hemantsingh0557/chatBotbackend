const Documentation = require('../models/Documentation');

// Controller to handle frontend questions (returns scraped data)
const getAnswer = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required." });
  }

  try {
    // Search the database for relevant data (in this case, we just return raw data)
    const answer = await Documentation.findOne({ rawData: new RegExp(question, 'i') });

    if (answer) {
      return res.status(200).json({ answer: answer.rawData });
    } else {
      return res.status(404).json({ message: "Sorry, no relevant data found." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAnswer };
