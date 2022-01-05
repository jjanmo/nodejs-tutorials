import express from 'express';
import path from 'path';

const app = express();
const port = 8000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
