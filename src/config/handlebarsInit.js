// A configuration file which will clean our main file (app.js) from the view engine setup code

import handlebars from "express-handlebars";

// We can leave the export anonymous (without name) if we want 
export default function handlebarsInit(app)
{
    // Setup the engine
    app.engine(`hbs`, handlebars.engine({
        extname: `hbs`,
    }));

    // Set default engine
    app.set(`view engine`, `hbs`);
    // Set the server to search for the views in the correct path
    app.set(`views`, `./src/views`);
}