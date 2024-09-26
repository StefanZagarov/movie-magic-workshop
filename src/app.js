import express from "express";
import handlebars from "express-handlebars";
// Import the routes.js for the modular routes
import routes from "./routes.js";

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
// Set the static route - must be at the top of all `app.get/set/etc` requests (__dirpath doesn't work with modules, only with CommonJS)
app.use(express.static(`public`));
// In order to get the data from the `create.hbs` form, we need to be able to use req.body property. For that we need the `urlencoded` middleware (body-parser is deprecated so we need to add the option {extended: false})
app.use(express.urlencoded({ extended: false }));

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

//Start the routes
app.use(routes);

// Add a listener
app.listen(port, () => console.log(`Server is listening on http://localhost:5000...`));