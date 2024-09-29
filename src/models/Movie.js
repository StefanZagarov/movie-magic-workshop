import { Schema, model } from `mongoose`;

// Set up the schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title is required!`]
    },
    genre: {
        type: String,
        required: [true, `Genre is required!`]
    },
    director: {
        type: String,
        required: [true, `Director is required!`]
    },
    year: {
        type: Number,
        required: [true, `Year is required!`]
    },
    rating: {
        type: Number,
        required: [true, `Rating is required!`]
    },
    description: {
        type: String,
        required: [true, `Description is required!`]
    },
    imageUrl: {
        type: String,
        required: [true, `Image urk is required!`]
    },
});

// Create the model - it makes automatic binding of singular and plural forms, this is how it will bing our Movie to `movies` collection

const Movie = model(`Movie`, movieSchema);

export default Movie;