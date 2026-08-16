import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { portfolioData } from './data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

app.get('/api/personal', (req, res) => {
  res.json(portfolioData.personal);
});

app.get('/api/about', (req, res) => {
  res.json(portfolioData.about);
});

app.get('/api/hobbies', (req, res) => {
  res.json(portfolioData.hobbies);
});

app.get('/api/school', (req, res) => {
  res.json(portfolioData.school);
});

app.get('/api/college', (req, res) => {
  res.json(portfolioData.college);
});

app.get('/api/achievements', (req, res) => {
  res.json(portfolioData.achievements);
});

app.get('/api/certificates', (req, res) => {
  res.json(portfolioData.certificates);
});

app.get('/api/courses', (req, res) => {
  res.json(portfolioData.courses);
});

app.get('/api/team', (req, res) => {
  res.json(portfolioData.teamMembers);
});

app.get('/api/hackathons', (req, res) => {
  res.json(portfolioData.hackathons);
});

app.get('/api/projects', (req, res) => {
  res.json(portfolioData.projects);
});

app.get('/api/social', (req, res) => {
  res.json(portfolioData.social);
});

// Serve static files from client dist
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✨ Portfolio server running on http://localhost:${PORT}`);
});
