const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: false,
    },
    actors: {
        type: String,
        required: false,
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
