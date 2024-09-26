// A file that contains the route definitions for our web server
// Routes in Express define how the server responds to client requests(GET, POST, PUT, DELETE, etc.) at different endpoints(URLs)
// The routes.js file is used to separate and organize routes, making the code more modular and easier to maintain

import { Router } from "express";

import homeController from "./controller/homeController.js";
import createMovieController from "./controller/createMovieController.js";

// Create instance of the modular router
const router = Router();

// Attach the home controller
router.use(homeController);

// router.use(createMovieController);
// There is a hack we can use instead:
router.use(`/movies`, createMovieController);
// Which means to not use `createMovieController` in general, but only when the route begins with `/movies` - if the address begins with `/movies`, only then go to `createMovieController`
// This in turn allows us to remove the `/create` at the beginning of the controller's path
// router.get(`/movies/create`, (req, res) =>   becomes   router.get(`/create`, (req, res) =>
// This allows us to strip the `/movies` part from the controller
// In case of one address line only (/create for example), if we add the path here, then the controller will hold only `/`

// Export the router to be used in app.js
export default router;