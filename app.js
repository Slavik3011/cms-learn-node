const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost:27017/cms')
  .then(() => console.log('Mongo connected'))
  .catch(err => console.log(err));

const app = express();
const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
const { select } = require('./helpers/handlebars-helpers');
app.engine('handlebars', hbs({ defaultLayout: 'home', helpers: { select }}));
app.set('view engine', 'handlebars');

//Upload Middleware
app.use(upload());

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Method Override
app.use(methodOverride('_method'));

// Load routes
const home = require('./routes/home');
const admin = require('./routes/admin');
const posts = require('./routes/admin/posts');

// Use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});