// Each function should have its own controller. Creating movies is not part of the home controller by logic
// This controller does everything related to the movies - creation, viewing details, etc

import { Router } from "express";
import movieService from "../services/movieService.js";

const router = Router();

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

    // Now we want to save the data to the data layer, however the controller can't directly access the data layer, so we have to use the service layer
    movieService.create(movieData);

    // Unable to load the css (ns error connection refused), even on lecturer's code, the problem comes from the browser most likely OR the static path is incorrect for the redirect
    res.redirect(`/`);
});

// We put the id before the details because the logic is that we get the movie, and then we say what we want to see of this movie (this is personal preference, it doesn't matter if details comes before the id or vice versa, it just makes more sense this way)
router.get(`/:movieId/details`, async (req, res) =>
{
    // Get the id from the url
    const movieId = req.params.movieId;

    // Get the movie
    const movie = await movieService.getOne(movieId);

    // Prepare view data - view data is the way we show data (not proccess, but just present data)
    // We create a new property which will show the amount of stars according to the number movie.rating is holding
    movie.ratingView = getRatingViewData(movie.rating);

    // Send the movie to the template
    res.render(`movies/details`, { movie });
});
// For the rating we create a star for the ammount of rating the movie has(if it has rating of 8 we show 8 stars)
function getRatingViewData(rating)
{
    // Since we are not escaping the rating in details.hbs so they can be converted to symbol, it is important that we make a check if the rating is a number and there are no strings (so we can't be hacked, XSS attack)
    if (!Number.isInteger(rating))
    {
        return `n/a`;
    }

    return `&#x2605;`.repeat(rating);
}

// Adding search functionality - we have a conditional statement in index.hbs for the search bar, where it displays the search bar if we give it a `true` boolean
// For this goal, we will render the home page, but this time we give additional boolean `isSearch` to activate the search bar
router.get(`/search`, async (req, res) =>
{
    // The string after a question mark ? are called `query string`
    // When the search button is clicked, the URL address will show the query string with all the fields' values (title, genre, year)
    // When using a search, it is better to use a GET request so the values of the search bar remain at the URL as query strings. This way we can copy the address and send it to others, and they will see the same result
    // console.log(req.query);

    // We want to filter movies based on the query
    const filter = req.query;

    const movies = await movieService.getAll(filter);
    // In order to keep the text in the search fields after we have submitted the form, we also give the filter object to the template
    console.log(filter);
    res.render(`home`, { isSearch: true, movies, filter });
});

export default router;