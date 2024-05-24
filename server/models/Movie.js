const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
 },
  description: { 
    type: String, 
    required: true,
 },
  director: { 
    type: String, 
    required: true,
 },
  genre: { 
    type: String, 
    required: true,
 },
  releaseDate: { 
    type: Date, 
    required: true,
 },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
