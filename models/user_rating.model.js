/* user_rating.model.js - Defines UserRating object model with Mongoose
    - Defines the UserRating Object model for the MongoDB collection

    Author: Austin Hess
*/

const mongoose = require('mongoose'),

/* Uses mongoose.Schema class to instantiate the model */
      Schema   = mongoose.Schema;

let UserRatingSchema = new Schema({
    movie: {type: Schema.Types.ObjectId, ref: 'Movie'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rating: {type: Number, min: 0, max: 5}
});

module.exports = mongoose.model('UserRating', UserRatingSchema);
      
