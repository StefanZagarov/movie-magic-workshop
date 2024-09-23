import homeController from "./controller/homeController.js";

// We need a new modular route
import { Router } from "express";

// Create instance of the modular router
const router = Router();

// Attach the home controller
router.use(homeController);

// Export the router to be used in app.js
export default router;