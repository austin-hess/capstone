const mongoose                          = require('mongoose'),
      Schema                            = mongoose.Schema,
      passportLocalMongoose             = require('passport-local-mongoose');

let UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);