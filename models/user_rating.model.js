const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

let UserRatingSchema = new Schema({
    movie: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    rating: {type: Number, min: 1, max: 5}
});

module.exports = mongoose.model('UserRating', UserRatingSchema);
      
