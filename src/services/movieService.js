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

// .populate() is a model population - we get all the casts details (full model) via the stored IDs in the Movie model
const getOne = (movieId) => Movie.findById(movieId).populate(`casts`);

// Attach the cast to the movie - using relation
const attach = (movieId, castId) =>
{
    // The bad way to attach
    // 1. Get the movie id
    // const movie = await Movie.findById(movieId);
    // 2. Add the cast id to the movie's cast property
    // movie.casts.push(castId);
    // 3. Save the new document
    // return movie.save();

    // Better way to do it since it does the operation on database-level
    // Push in the casts property the castId
    // MUST BE AWAITED WHEN CALLED
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
};

// This is called `Anonymus export`
export default { getAll, getOne, create, attach };