const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
    title: String,
    year: String,
    genres: [String],
    ratings: [Schema.Types.ObjectId]
});

MovieSchema.index({'title': 'text'});

module.exports = mongoose.model('Movie', MovieSchema);