// require node modules
const express                          = require('express'),
      mongoose                         = require('mongoose'),
      ejs                              = require('ejs'),
      session                          = require('express-session'),
      passport                         = require('passport'),
      LocalStrategy                    = require('passport-local'),
      passportLocalMongoose            = require('passport-local-mongoose'),
      bodyParser                       = require('body-parser');


// initialize express app
const app                              = express();

// require models
const Movie                            = require('./models/movie.model'),
      User                             = require('./models/user.model');

// view engine setup
app.set('view engine', 'ejs');

// configure middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'The world is actually really rad',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// configure routers
app.use('/movies', movie_router);
app.use('/users', user_router);
app.use('/', index_router);

// initialize connection to the database
let dev_db_url = "mongodb+srv://ahess:Runyourdayallweeklong%231@movierecs-jit0p.gcp.mongodb.net/test?retryWrites=true";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed:'));

// require routes
const movie_router                            = require('./routes/movie.route'),
      user_router                             = require('./routes/user.route'),
      index_router                            = require('./routes/index.route');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
});