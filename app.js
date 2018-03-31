const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs({ defaultLayout: 'home' }));
app.set('view engine', 'handlebars');

const main = require('./routes/home/main');

app.use('/', main);

app.listen(3000, () => {
  console.log(`Server started on port ${3000}`);
});