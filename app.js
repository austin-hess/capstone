// require node modules
const express                          = require('express');
const bodyParser                       = require('body-parser');

// require routes
const movie                            = require('./routes/movie.route');
const user                             = require('./routes/user.route');

// initialize express app
const app                              = express();

// initialize connection to the database
const mongoose                         = require('mongoose');
let dev_db_url = "mongodb+srv://ahess:Runyourdayallweeklong%231@movierecs-jit0p.gcp.mongodb.net/test?retryWrites=true";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection failed:'));

// configure middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// configure routers
app.use('/movies', movie);
app.use('/users', user);

app.get('/', (req, res) => {
    res.send("Hello from App Engine!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
});