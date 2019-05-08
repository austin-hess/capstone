/* user.model.js - Defines User object model with Mongoose
    - Defines the User Object model for the MongoDB collection

    Author: Austin Hess
*/

const mongoose                          = require('mongoose'),

/* Uses mongoose.Schema class to instantiate the model */
      Schema                            = mongoose.Schema,

/* Include passport-local-mongoose to install plugin on the User schema for passport functionality */
      passportLocalMongoose             = require('passport-local-mongoose');

let UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    first_name: String,
    last_name: String,
    ratings: [{type: Schema.Types.ObjectId, ref: 'UserRating'}],
    predictions: [{type: Schema.Types.ObjectId, ref: 'Movie'}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);