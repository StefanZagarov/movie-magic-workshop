import express from "express";
import handlebars from "express-handlebars";
import homeController from "./controller/homeController.js";

const port = 5000;

// Get the server
const app = express();

// Setup the engine
app.engine(`hbs`, handlebars.engine({
    extname: `hbs`,
}));

// Set default engine
app.set(`view engine`, `hbs`);
// Set the server to search for the views in the correct path
app.set(`views`, `./src/views`);
// Set the static route - must be at the top of all `app.get/set/etc` requests
app.use(express.static(`public`));

// Add the default route
// app.get(`/`, (req, res) =>
// {
//     res.render(`index`);
// });

//////////////////////////////////// This goes in the controller folder as a modular router ////////////////////////////////////
// // Add the new default route, after we have created the default home HTML
// app.get(`/`, (req, res) =>
// {
//     res.render(`home`);
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Attach the modular router
app.use(homeController);

// Add a listener
app.listen(port, () => console.log(`Server is listening on http://localhost:5000...`));