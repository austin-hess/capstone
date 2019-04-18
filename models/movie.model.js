const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
    title: String,
    year: String,
    genres: [String],
    ratings: [{type: Schema.Types.ObjectId, ref: 'UserRating'}]
});

module.exports = mongoose.model('Movie', MovieSchema);