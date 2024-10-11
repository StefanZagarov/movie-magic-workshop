import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        require: true,
        validate: [/^[A-Za-z0-9 ]+$/, `Name can contain only alpha numeric characters!`],
    },
    age: {
        type: Number,
        min: 1,
        max: 120
    },
    born: {
        type: String,
        minLength: [2, `Country must be at least 2 characters long!`],
        validate: [/^[A-Za-z0-9 ]+$/, `Country can contain only alpha numeric characters!`]
    },
    imageUrl: {
        type: String,
        validate: [/[^https?:\/\/]/, `Invalid image URL!`]
    },
});

const Cast = model(`Cast`, castSchema);

export default Cast;