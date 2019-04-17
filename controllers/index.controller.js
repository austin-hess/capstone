const isLoggedIn = require('../middleware/auth').isLoggedIn;

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/secret', isLoggedIn, function(req, res) {
    res.render('pages/secret');
});

app.get('/register', function (req, res) {
    res.render('pages/register');
});

app.get('/login', function (req, res) {
    res.render('pages/login');
});

app.post('/register', function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('pages/register');
        }
        // Logs user in
        passport.authenticate("local")(req, res, function() {
            res.redirect('/secret');
        })
    });
});

app.post('/login', passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"  
}), function (req, res) { });