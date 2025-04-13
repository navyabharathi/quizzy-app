const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory dummy users
const users = [{ id: 1, username: 'alice', password: '1234' }];

// In-memory dummy quizzes
const quizzes = [
  { id: 1, title: 'JavaScript Basics' },
  { id: 2, title: 'React Fundamentals' },
];

// Load quizzes.json file once at startup
const quizzesFilePath = path.join(__dirname, 'data', 'quizzes.json');
const quizzesData = JSON.parse(fs.readFileSync(quizzesFilePath, 'utf-8'));

// === ROUTES ===

// POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ id: user.id, username: user.username });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// GET /quizzes
app.get('/quizzes', (req, res) => {
  res.json(quizzes);
});

// GET /quiz/:id/questions
app.get('/quiz/:id/questions', (req, res) => {
  const quizId = req.params.id;
  const questions = quizzesData[quizId];
  if (!questions) {
    return res.status(404).json({ error: 'Quiz not found' });
  }
  res.json(questions);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
