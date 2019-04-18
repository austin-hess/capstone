module.exports = {

    get_page_index: function (req, res) {
        console.log(req.user);
        res.render('pages/index', {user : req.user});
    },

    get_page_registration: function (req, res) {
        res.render('pages/registration', {user : req.user});
    },

    get_page_login: function (req, res) {
        res.render('pages/login', {user : req.user});
    }

}