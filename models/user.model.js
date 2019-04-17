const mongoose                          = require('mongoose'),
      Schema                            = mongoose.Schema,
      passportLocalMongoose             = require('passport-local-mongoose');

let UserSchema = new Schema({
    username: {type: String, required: true, max: 30},
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);