/* movie.model.js - Defines movie object model with Mongoose
    - Defines the Movie Object model for the MongoDB collection

    Author: Austin Hess
*/

const mongoose = require('mongoose');

/* Uses mongoose.Schema class to instantiate the model */
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
    title: String,
    year: String,
    genres: [String],
    ratings: [{type: Schema.Types.ObjectId, ref: 'UserRating'}],
    imbdUrl: String,
    ml_id: Number
});

module.exports = mongoose.model('Movie', MovieSchema);