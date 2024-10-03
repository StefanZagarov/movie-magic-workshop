// A configuration file which will clean our main file (app.js) from the view engine setup code

import handlebars from "express-handlebars";

// We can leave the export anonymous (without name) if we want 
export default function handlebarsInit(app)
{
    // Setup the engine
    app.engine(`hbs`, handlebars.engine({
        extname: `hbs`,
        // Import helpers, they must be imported to the module, or written here
        helpers: {
            rating: function (rating)
            {
                if (!Number.isInteger(rating))
                {
                    return `n/a`;
                }

                return `&#x2605;`.repeat(rating);
            }
        }
    }));

    // Set default engine
    app.set(`view engine`, `hbs`);
    // Set the server to search for the views in the correct path
    app.set(`views`, `./src/views`);
}