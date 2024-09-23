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

// Finally, export it
export default router;