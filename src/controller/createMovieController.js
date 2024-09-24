// Each function should have its own controller. Creating movies is not part of the home controller by logic

import { Router } from "express";

const router = Router();

// We add /movies to the /create address because in the future we may have a creation for other things aswell. In the `main` layout we need to change the path aswell to /movies/create
router.get(`/create`, (req, res) =>
{
    // The path we give will be searched in `views`
    res.render(`movies/create`);
});

export default router;