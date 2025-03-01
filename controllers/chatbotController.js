const Documentation = require('../models/Documentation');

// Controller to handle frontend questions (returns scraped data)
const getAnswer = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required.", found: false });
  }

  try {
    // Search the database for relevant data (case-insensitive search)
    const answer = await Documentation.findOne({ rawData: new RegExp(question, 'i') });

    // console.log("Question ===> ", question);
    // console.log("Answer ===> ", answer);

    if (answer) {
      return res.status(200).json({ answer: answer.rawData, found: true });
    } else {
      return res.status(404).json({ message: "Sorry, no relevant data found.", found: false });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error, found: false });
  }
};

module.exports = { getAnswer };
