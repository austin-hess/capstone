const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
    title: {type: String, required: true},
    year: {type: String, required: true, length: 4},
    genres: {type: Array, required: false},
    mlId: {type: Number, required: true}
});

module.exports = mongoose.model('Movie', MovieSchema);