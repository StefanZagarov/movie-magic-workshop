import Cast from "../models/Cast.js";

const create = (cast) => Cast.create(cast);

// Function to get all the casts for the attach cast page
const getAll = () => Cast.find();

// Get all casts excluding the ones already added to the movie - MongoDB operator syntax
// const getAllWithout = (castIds) => Cast.find({ _id: { $nin: castIds } });
// Alternate syntax - mongoose
// const getAllWithout = (casts) => Cast.find().nin('_id', casts);


const getAllWithout = (characters) =>
{
    // Since we have nested the casts ids, we need to first extract all of the `characters`, which contain the cast document with the id data
    const casts = characters.map(character => character.cast);

    const result = Cast.find().nin('_id', casts);
    return result;
};

export default { create, getAll, getAllWithout };