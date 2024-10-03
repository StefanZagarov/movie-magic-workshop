import Movie from "../models/Movie.js";

const getAll = (filter = {}) =>
{
    // Since this returns a Query, we can stack over it before we `await` to get the document
    let moviesQuery = Movie.find();
    console.log(filter);
    // The filters will work in steps: it will first filter by name, then by genre, and finally by year
    if (filter.title)
    {
        // Get all movies which contain the inputted letters in their name, toLowerCase() makes it case insensitive
        // moviesQuery = moviesQuery.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()));

        // MongoDB search - we need to search with case-insensitive logic, but we can't make titles to lower case because displaying them like that will be ugly
        // The solution is to search by the RegEx operator - $options: `i` means that the search is case insensitive

        moviesQuery.find({ title: { $regex: filter.title, $options: 'i' } });

        // Alternative way
        // moviesQuery.regex('title', new RegExp(filter.search, 'i'))
    }

    if (filter.genre)
    {
        // moviesQuery = moviesQuery.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());

        // MongoDB search - first option
        // Since we don't make the filter (input) to lower case here, this check will only work if we make sure that the input genre is also in lower case - for this we go in the Movie model and make genre to always convert to lower case by adding `lowercase: true`
        moviesQuery.find({ genre: filter.genre.toLowerCase() });

        // MongoDB search - second option
        // moviesQuery.where(`genre`).equals(filter.genre.toLowerCase());
    }

    if (filter.year)
    {
        // movies = movies.filter(movie => movie.year === filter.year);

        // MongoDB search - first option
        // moviesQuery.find({ year: filter.year });

        // MongoDB search - second option
        moviesQuery.where(`year`).equals(filter.year);
    }

    return moviesQuery;
};

// The controller wants to send the data to be saved at the data layer, so the task of the service is to accept the function of the controller and send it to the data layer
// Mongoose will create the unique ID by itself and will convert the rating from string to a number
const create = (newMovie) => Movie.create(newMovie);

// .populate() is a model population - we get all the casts details (full model) via the stored IDs in the Movie model
// casts.cast - the `cast` is nested in `casts`
const getOne = (movieId) => Movie.findById(movieId).populate(`casts.cast`);

// Attach the cast to the movie - using relation
const attach = (movieId, castId, character) =>
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
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: { cast: castId, character } } });
};

// This is called `Anonymus export`
export default { getAll, getOne, create, attach };