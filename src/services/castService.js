import Cast from "../models/Cast.js";

const create = (cast) => Cast.create(cast);

// Function to get all the casts for the attach cast page
const getAll = () => Cast.find();

export default { create, getAll };