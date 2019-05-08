/* app.js - Application entry point
    - Requires any dependencies (NPM modules)
    - Configures middlewares
    - Sets up view engine
    - Connects to database
    - Includes Express routers to define routes
    - Starts listening on port 3000 of the local host

    Author: Austin Hess
*/

/* Require all NPM dependencies */
const express                          = require('express'),
      mongoose                         = require('mongoose'),
      ejs                              = require('ejs'),
      session                          = require('express-session'),
      passport                         = require('passport'),
      LocalStrategy                    = require('passport-local'),
      passportLocalMongoose            = require('passport-local-mongoose'),
      bodyParser                       = require('body-parser'),
      path                             = require('path');


/* Instantiate the Express app object */
const app                              = express();

/* Require the Mongoose object models */
const Movie                            = require('./models/movie.model'),
      User                             = require('./models/user.model');

/* Tell Express that the view engine will be Embedded Javascript Templating */
app.set('view engine', 'ejs');

/* Set up 'public' directory as path for serving static resources */
app.use('/static', express.static(path.join(__dirname, 'public')));

/* Configure middlewares for Express app instance to use */
/* Use bodyParser to parse HTTP request easily */
app.use(bodyParser.urlencoded({extended: true}));

/* Use express-session to keep track of sessions for authentication in conjunction with passport */
app.use(session({
    secret: 'The world is actually really rad',
    resave: false,
    saveUninitialized: false
}));

/* Initialize passport as authentication middleware and use its session functionality with previously defined express-session middleware */
app.use(passport.initialize());
app.use(passport.session());

/* Configure the LocalStrategy to be the plugin included on the User object model */
passport.use(new LocalStrategy(User.authenticate()));

/* Configure passport's serialization/deserialization functions to use the plugins included on the User object model */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Connect to the MongoDB cloud-hosted database */
const mongoDB = "mongodb+srv://ahess:-%24GMvyLwc8Lr%5E7a@movierecs-jit0p.gcp.mongodb.net/test?retryWrites=true";
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed:'));

/* Include the Express routers that define the HTTP routes the server can receive */
const movie_router                            = require('./routes/movie.route'),
      user_router                             = require('./routes/user.route'),
      index_router                            = require('./routes/index.route'),
      auth_router                             = require('./routes/auth.route');

/* Define the paths to prepend each router definition */
app.use('/', auth_router);
app.use('/movies', movie_router);
app.use('/users', user_router);
app.use('/', index_router);

/* Make the server begin listening on port 3000 of the localhost */
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
});
