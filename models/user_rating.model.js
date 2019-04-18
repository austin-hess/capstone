const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

let UserRatingSchema = new Schema({
    movie: {type: Schema.Types.ObjectId, ref: 'Movie'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number, min: 1, max: 5}
});

module.exports = mongoose.model('UserRating', UserRatingSchema);
      
