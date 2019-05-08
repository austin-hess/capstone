/* auth.js - Contains a custom middleware function for providing a boolean on whether or not a user is currently authenticated on the session

    The middleware passport provides links a currently logged in user to the request object that is passed in each callback function

    Author: Austin Hess
*/

module.exports = {
    
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },

}