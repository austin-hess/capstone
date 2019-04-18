const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
    title: String,
    year: String,
    genres: [String],
    ratings: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Movie', MovieSchema);