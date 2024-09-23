import express from "express";
import handlebars from "express-handlebars";

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

// Add the default route
app.get(`/`, (req, res) =>
{
    res.render(`index`);
});

// Add a listener
app.listen(port, () => console.log(`Server is listening on http://localhost:5000...`));