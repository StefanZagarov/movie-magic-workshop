import { Schema, model, Types } from "mongoose";

// Set up the schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title is required!`],
    },
    genre: {
        type: String,
        required: [true, `Genre is required!`],
        lowercase: true
    },
    director: {
        type: String,
        required: [true, `Director is required!`]
    },
    year: {
        type: Number,
        required: [true, `Year is required!`],
        min: 1900,
        max: 2050
    },
    rating: {
        type: Number,
        required: [true, `Rating is required!`],
        min: 1,
        max: 10
    },
    description: {
        type: String,
        required: [true, `Description is required!`],
        maxLength: 100
    },
    imageUrl: {
        type: String,
        required: [true, `Image urk is required!`]
    },
    // Creating relational data: many-to-many
    // We create a casts property, which will hold an array, since we will have many-to-many relations
    // In it we describe in {} block what the essence of the relation is
    // ObjectId is a specific type coming from mongoose
    // ref is the reference to the model we are going to refer (link) to
    casts: [{
        _id: false,
        character: String,
        cast: {
            type: Types.ObjectId,
            ref: 'Cast'
        },
    }],
});

// Create the model - it makes automatic binding of singular and plural forms, this is how it will bing our Movie to `movies` collection

const Movie = model(`Movie`, movieSchema);

export default Movie;