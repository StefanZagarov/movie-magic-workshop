import movieData from "../data/movieData.js";
import uniqid from "uniqid";

// The empty object is an optional filter for when we want to get only movies specified by the search function
const getAll = async (filter = {}) =>
{
    let movies = await movieData.getAll();

    // The filters will work in steps: it will first filter by name, then by genre, and finally by year
    if (filter.title)
    {
        // Get all movies which contain the inputted letters in their name, toLowerCase() makes it case insensitive
        movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()));
    }

    if (filter.genre)
    {
        movies = movies.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
    }

    if (filter.year)
    {
        movies = movies.filter(movie => movie.year === filter.year);
    }

    return movies;
};

// The controller wants to send the data to be saved at the data layer, so the task of the service is to accept the function of the controller and send it to the data layer
const create = (newMovie) =>
{
    // We must create a unique ID for each movie we create in order to access the details for that movie, as the URL needs to contain a unique address so it knows which movie we want to see the details of
    // So how do we create an ID in a way where there wont be a collision (identical ids)?
    // We install a library for generating ids, we will install one that is easy to use - `uniqid`
    newMovie.id = uniqid();

    // Parse the rating from string to a number so we can display the stars, as they require specifically a number
    newMovie.rating = Number(newMovie.rating);

    // Always return promises
    return movieData.create(newMovie);
};

// Not the most optimal way to get a movie, but for this demo it will do
const getOne = async (movieId) =>
{
    const movies = await movieData.getAll();

    const movie = movies.find(movie => movie.id === movieId);

    return movie;
};

// This is called `Anonymus export`
export default { getAll, getOne, create };