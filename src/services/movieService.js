import Movie from "../models/Movie.js";

// TODO: Filter in db not in memory
const getAll = async (filter = {}) =>
{
    let movies = await Movie.find();

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
// Mongoose will create the unique ID by itself and will convert the rating from string to a number
const create = (newMovie) => Movie.create(newMovie);

// .lean() is a method of Query, if those are Documents, then we won't be able to call .lean()
// .lean() converts Documents to clean objects
const getOne = (movieId) => Movie.findById(movieId).lean();

// This is called `Anonymus export`
export default { getAll, getOne, create };