// A modular router

// import express from "express";
// Create a router - don't let the capital letter lead you astray: this is not an object so there is no need for a "new" keyword
// const router = express.Router();

// Alternative import of router
import { Router } from "express";
import movieServices from "../services/movieService.js";

const router = Router();

// Attach an endpoint
router.get(`/`, async (req, res) =>
{
    // Get the movies from the DB
    const movies = await movieServices.getAll();

    // The path we give will be searched in `views`. If we don't specify a file, it will search for the `index` by default settings
    // Send the tempalte (partial called `movies`) to the `home>index.hbs` file
    res.render(`home`, { movies });
});

// The about page makes sense to be in the home controller because it is a static page
router.get(`/about`, (req, res) =>
{
    res.render(`home/about`);
});

router.get(`/test`, (req, res) =>
{
    res.redirect(`/`);
});

// Finally, export it
export default router;