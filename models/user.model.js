const mongoose                          = require('mongoose'),
      Schema                            = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    email: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('User', UserSchema);