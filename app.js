const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost:27017/cms')
  .then(() => console.log('Mongo connected'))
  .catch(err => console.log(err));

const app = express();
const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
const { select, generateTime } = require('./helpers/handlebars-helpers');
app.engine('handlebars', hbs({ defaultLayout: 'home', helpers: { select, generateTime }}));
app.set('view engine', 'handlebars');

//Upload Middleware
app.use(upload());

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Method Override
app.use(methodOverride('_method'));


app.use(session({
  secret: 'supersecret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(flash());

//Local Variables using Middleware
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  console.log(req.flash())
  console.log(req.flash('success_message'))
  next()
});

// Load routes
const home = require('./routes/home');
const admin = require('./routes/admin');
const posts = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');

// Use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// TODO flashes after create post 114 lesson(not working)
// TODO not delete default post image
//TODO rewrite wiew for categories widget