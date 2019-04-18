const mongoose                          = require('mongoose'),
      Schema                            = mongoose.Schema,
      passportLocalMongoose             = require('passport-local-mongoose');

let UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    first_name: String,
    last_name: String,
    ratings: [Schema.Types.ObjectId]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);