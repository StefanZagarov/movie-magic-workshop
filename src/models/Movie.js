import { Schema, model, Types } from "mongoose";

// Set up the schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, `Title is required!`],
        minLength: [1, `Title is too short!`],
        validate: [/^[A-Za-z0-9 ]+$/, `Title can contain only alpha numeric characters!`]
    },
    genre: {
        type: String,
        required: [true, `Genre is required!`],
        lowercase: true,
        minLength: [1, `Genre name is too short!`],
        validate: [/^[A-Za-z0-9 ]+$/, `Genre can contain only alpha numeric characters!`]
    },
    director: {
        type: String,
        required: [true, `Director name is required!`],
        minLength: [4, `Director name is too short!`],
        validate: [/^[A-Za-z0-9 ]+$/, `Director name can contain only alpha numeric characters!`]
    },
    year: {
        type: Number,
        required: [true, `Year is required!`],
        min: [1900, 'Cannot add movies older than 1900 year!'],
        max: [2050, 'Cannot add movies after 2050!'],
    },
    // Making our own scenario to demonstrate custom validators
    // If the movie is before 2000 then the rating is not required, if its after the 2000 year, then the rating is required
    rating: {
        type: Number,
        validate: {
            // The function will return a boolean
            validator: function (value)
            {
                if (this.year >= 2000)
                {
                    // Return the truthy or falsy value of the variable "value"
                    return !!value;
                }

                return true;
            },
            message: 'Rating is required for movies after 2000 year',
        },
        min: [1, `Rating should be at least 1!`],
        max: [10, `Rating can't be more than 10!`]
    },
    description: {
        type: String,
        required: [true, `Description is required!`],
        maxLength: [500, `Max description length is 500 characters!`],
        validate: [/^[A-Za-z0-9 ]+$/, `Description can contain only alpha numeric characters!`]
    },
    imageUrl: {
        type: String,
        required: [true, `Image url is required!`],
        validate: [/^https?:\/\//, `Invalid image URL!`]
    },

    // Creating relational data: many-to-many
    // We create a casts property, which will hold an array, since we will have many-to-many relations
    // In it we describe in {} block what the essence of the relation is
    // ObjectId is a specific type coming from mongoose
    // ref is the reference to the model we are going to refer (link) to
    casts: [{
        _id: false,
        character: {
            type: String,
            minLength: [2, `Character name is too short!`],
            validate: [/^[A-Za-z0-9 ]+$/, `Character can contain only alpha numeric characters!`]
        },
        cast: {
            type: Types.ObjectId,
            ref: 'Cast'
        },
    }],

    // Relation
    owner: {
        type: Types.ObjectId,
        ref: "User"
    }
});

// Create the model - it makes automatic binding of singular and plural forms, this is how it will bing our Movie to `movies` collection

const Movie = model(`Movie`, movieSchema);

export default Movie;