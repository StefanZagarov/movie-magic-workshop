// Each function should have its own controller. Creating movies is not part of the home controller by logic
// This controller does everything related to the movies - creation, viewing details, etc

import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const router = Router();

// Deprecated (we don't use it anymore since we use .lean())
function toArray(documents)
{
    return documents.map(document => document.toObject());
}

// We add /movies to the /create address because in the future we may have a creation for other things aswell. In the `main` layout we need to change the path aswell to /movies/create
// Full URL address: /movies/create
router.get(`/create`, (req, res) =>
{
    // The path we give will be searched in `views`
    res.render(`movies/create`);
});

// We have a form that will try to POST on the same URL address, so we need a POST handler in order to handle the form submit
// We want to proccess the field data
router.post(`/create`, (req, res) =>
{
    // We want to get the data from the request's body (req.body property). But it will be undefined unless we add in app.js the middleware app.use(express.urlencoded());
    // First we get the data from the request body
    const movieData = req.body;

    // Add the user id to the movie's info so we can use it later to check if the movie is created by the logged in user
    const ownerId = req.user._id;

    // Now we want to save the data to the data layer, however the controller can't directly access the data layer, so we have to use the service layer
    movieService.create(movieData, ownerId);

    // Unable to load the css (ns error connection refused), even on lecturer's code, the problem comes from the browser most likely OR the static path is incorrect for the redirect
    res.redirect(`/`);
});

// We put the id before the details because the logic is that we get the movie, and then we say what we want to see of this movie (this is personal preference, it doesn't matter if details comes before the id or vice versa, it just makes more sense this way)
router.get(`/:movieId/details`, async (req, res) =>
{
    // Get the id from the url
    const movieId = req.params.movieId;

    // Get the movie
    // .lean() is a method of Query, if those are Documents, then we won't be able to call .lean()
    // .lean() converts Documents to clean objects
    const movie = await movieService.getOne(movieId).lean();

    // The rating has been removed for an express "helper" - check "handlebarsInit.js" > helper:
    // Prepare view data - view data is the way we show data (not proccess, but just present data)
    // We create a new property which will show the amount of stars according to the number movie.rating is holding
    // movie.ratingView = getRatingViewData(movie.rating);

    // Check if the currently viewed movie is by the logged in user
    const isOwner = req.user?._id;

    // We need to turn to a service which will make the connection - relation
    // We can get the id of all the casts, and populate the data of each cast

    // Send the movie to the template
    res.render(`movies/details`, { movie });
});

// The rating has been removed for an express "helper" - check "handlebarsInit.js" > helper:
// For the rating we create a star for the ammount of rating the movie has(if it has rating of 8 we show 8 stars)
// function getRatingViewData(rating)
// {
//     // Since we are not escaping the rating in details.hbs so they can be converted to symbol, it is important that we make a check if the rating is a number and there are no strings (so we can't be hacked, XSS attack)
//     if (!Number.isInteger(rating))
//     {
//         return `n/a`;
//     }

//     return `&#x2605;`.repeat(rating);
// }

// Adding search functionality - we have a conditional statement in index.hbs for the search bar, where it displays the search bar if we give it a `true` boolean
// For this goal, we will render the home page, but this time we give additional boolean `isSearch` to activate the search bar
router.get(`/search`, async (req, res) =>
{
    // The string after a question mark ? are called `query string`
    // When the search button is clicked, the URL address will show the query string with all the fields' values (title, genre, year)
    // When using a search, it is better to use a GET request so the values of the search bar remain at the URL as query strings. This way we can copy the address and send it to others, and they will see the same result
    // console.log(req.query);

    // We want to filter movies based on the query - get the input and filter to show only the movies matching the input
    const filter = req.query;

    const movies = await movieService.getAll(filter).lean(); // Convert to clean objects

    // In order to keep the text in the search fields after we have submitted the form, we also give the filter object to the template
    res.render(`home`, { isSearch: true, movies, filter });
});

// Adding the attach button functionality - alternative way to implement is by using "nested route"
router.get(`/:movieId/attach`, async (req, res) =>
{
    const movie = await movieService.getOne(req.params.movieId).lean();
    // Getting all casts to send to the attach.hbs, we get all casts that are not already added
    const casts = await castService.getAllWithout(movie.casts).lean();

    res.render(`cast/attach`, { movie, casts });
});

// Create an action for sending the data of attach cast
router.post(`/:movieId/attach`, async (req, res) =>
{
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    const character = req.body.character;

    await movieService.attach(movieId, castId, character);

    res.redirect(`/movies/${movieId}/details`);
});

export default router;