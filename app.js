// require node modules
const express                          = require('express'),
      mongoose                         = require('mongoose'),
      ejs                              = require('ejs'),
      session                          = require('express-session'),
      bodyParser                       = require('body-parser'),
      cookieParser                     = require('cookie-parser');

// initialize express app
const app                              = express();

// require routes
const movie                            = require('./routes/movie.route'),
      user                             = require('./routes/user.route'),
      index                            = require('./routes/index.route');

// require models
const Movie                            = require('./models/movie.model'),
      User                             = require('./models/user.model');

// view engine setup
app.set('view engine', 'ejs');

// configure middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// configure routers
app.use('/movies', movie);
app.use('/users', user);
app.use('/', index);

// initialize connection to the database
let dev_db_url = "mongodb+srv://ahess:Runyourdayallweeklong%231@movierecs-jit0p.gcp.mongodb.net/test?retryWrites=true";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed:'));

app.get('/', (req, res) => {
    res.send("Hello from App Engine!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
});