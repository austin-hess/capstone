const User = require ("../models/user.model");

exports.user_create = function (req, res) {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.fName,
        lastName: req.body.lName
    });

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User created successfully');
    })
};

exports.get_user = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.update_user = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('User updated');
    });
}

exports.delete_user = function (req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Deleted user succesfully');
    });
}

exports.test = function(req, res) {
    res.send('Greetings from the Test controller');
};