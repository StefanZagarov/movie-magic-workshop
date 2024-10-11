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
    const movies = await movieServices.getAll().lean();

    // Handlebars doesn't know what a Document is, so we fix it by sending clean data - using .lean()
    res.render(`home`, { movies });
});

// The about page makes sense to be in the home controller because it is a static page
router.get(`/about`, (req, res) =>
{
    res.render(`home/about`);
});

// Finally, export it
export default router;