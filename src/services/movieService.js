import movieData from "../data/movieData.js";
import uniqid from "uniqid";

const getAll = () => movieData.getAll();

// The controller wants to send the data to be saved at the data layer, so the task of the service is to accept the function of the controller and send it to the data layer
const create = (newMovie) =>
{
    // We must create a unique ID for each movie we create
    // So how do we create an ID in a way where there wont be a collision (identical ids)?
    // We install a library for generating ids, we will install one that is easy to use - `uniqid`
    newMovie.id = uniqid();

    // Always return promises
    return movieData.create(newMovie);
};

// This is called `Anonymus export`
export default { getAll, create };