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

router.get(`/:movieId/details`, async (req, res) =>
{
    // Get the id from the url
    const movieId = req.params.movieId;

    // Get the movie
    const movie = await movieService.getOne(movieId);

    // Send the movie to the template
    res.render(`movies/details`, { movie });
});

export default router;