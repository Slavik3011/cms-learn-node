const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.engine('handlebars', hbs({ defaultLayout: 'home' }));
app.set('view engine', 'handlebars');

// Load routes
const home = require('./routes/home');
const admin = require('./routes/admin');

// Use routes
app.use('/', home);
app.use('/admin', admin);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});