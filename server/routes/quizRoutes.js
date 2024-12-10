const express = require("express");
const router = express.Router();
router.use(express.json());
const {verifyToken} = require("./auth");
const { Users } = require('../models/user');

const { google } = require('googleapis');

const sheets = google.sheets({ version: 'v4' });
// Fetch quiz data from Google Sheets and store it globally
async function fetchQuizData(SpreadsheetId) {
  try {
    const spreadsheetId = SpreadsheetId;  // Replace with your sheet ID
    const range = 'Sheet1!A1:H10';                                      // The range you want to fetch
    const apiKey = process.env.API_KEY;            // Replace with your API Key
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,  
      key: apiKey
    });

    quizData = response.data.values; // extract quiz data
    return quizData;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error.message);
  }
}


 



router.post('/api/submit-quiz', verifyToken, async (req, res) => {
  try {
    const username = req.user.username; // Extracted from token via `verifyToken`
    console.log(username);
    const { answers, quizId ,spreadSheetId} = req.body;
    console.log(req.body);

    if (!answers || !quizId) {
      return res.status(400).json({ error: 'Answers and Quiz ID are required' });
    }

    // Fetch quiz data
    const quizData = await fetchQuizData(spreadSheetId);
    console.log(quizData); 

    // Map correct answers
    const correctAnswers = {};
    quizData.forEach((q) => {
      correctAnswers[q[0]] = q[6]; // Assuming q[0] is Question ID, q[6] is correct answer
    });

    // Calculate the score
    let score = 0;
    for (const [questionId, userAnswer] of Object.entries(answers)) {
      if (correctAnswers[questionId] === userAnswer) {
        score++;
      }
    }

    // Update the user's score
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("score", score);
    user.score[quizId] = score; // Store score at the quiz ID index

    await user.save(); // Save the updated user data to the database

    // Send response back to the client
    res.json({ score, total: quizData.length });
  } catch (error) {
    console.error('Error in /api/submit-quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  router.get('/api/get-quiz-1', async (req, res) => {
    const quizData = await fetchQuizData('18qb6W6v5iMLL-1Ow6OhgmNK9aJkW-es3cMhcfSMrHr0');
    const filteredQuizData =  quizData.slice(1);
    res.json(filteredQuizData); // Send the quiz data to the frontend
  });

  router.get('/api/get-quiz-2', async (req, res) => {
    const quizData = await fetchQuizData('1KNqpnZgGk8-5ruXzkKYS2H7EPvC1Pc7P4DDmujCMVTU');
    const filteredQuizData =  quizData.slice(1);
    res.json(filteredQuizData); // Send the quiz data to the frontend
  });

  router.get('/api/get-quiz-3', async (req, res) => {
    const quizData = await fetchQuizData('1-qcnj8QIehklk9Pum2JspfpPG82VD5o3mQNQgME2Gyg');
    const filteredQuizData =  quizData.slice(1);
    res.json(filteredQuizData); // Send the quiz data to the frontend
  });
  

  router.get('/api/get-student-Data',verifyToken, async (req, res) => {
    const username = req.user.username; // Extracted from token via `verifyToken`
    const studentData = await Users.findOne({ username });
    res.json(studentData);
  })
 module.exports = router;