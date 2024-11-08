// The main file from which the whole program starts

import express from "express";
// Import the routes.js for the modular routes
import routes from "./routes.js";

// Import dotenv
import "dotenv/config";

// Import the configuration of the express
import expressInit from "./config/expressInit.js";
// Import the configuration of the view engine
import handlebarsInit from "./config/handlebarsInit.js";
// Import the connection to the database
import mongooseInit from "./config/mongooseInit.js";

const port = 3000;

// Get the server
const app = express();

// Initialise the express configuraion
expressInit(app);
// Initialise the config of the view engine
handlebarsInit(app);
// We can either first connect to the DB and then start the app, or start the app and then connect the the DB. It doesn't matter either way, because those are two separate actions
mongooseInit();

//Start the routes
app.use(routes);

// Add a listener
app.listen(port, () => console.log(`Server is listening on http://localhost:${port}...`));