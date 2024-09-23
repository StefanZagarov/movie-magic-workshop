// A modular router

// import express from "express";
// Create a router - don't let the capital letter lead you astray: this is not an object so there is no need for a "new" keyword
// const router = express.Router();

// Alternative import of router
import { Router } from "express";

const router = Router();

// Attach an endpoint
router.get(`/`, (req, res) =>
{
    res.render(`home`);
});

// The about page makes sense to be in the home controller because it is a static page
router.get(`/about`, (req, res) =>
{
    res.render(`home/about`);
});

// Finally, export it
export default router;