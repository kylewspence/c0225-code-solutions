import express from 'express';

const app = express();

app.use((req, res, next) => {
  console.log('Hello, World!');
  console.log('The date is', new Date());
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the homepage.');
});

app.get('/notes', (req, res) => {
  res.send('Here are your notes.');
});

app.post('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.send(`You posted note with ID: ${noteId}`);
});

app.listen(8080, () => {
  console.log('Express server listening on port 8080');
});
