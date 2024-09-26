// Reads and writes data from the movies

import fs from "fs/promises";
// We need to get the right paths
import path from "path";

// Get the path of the database - it always starts reading from the root folder
const dbPath = path.resolve(`./src/db.json`);

// A function of getting all the data of the database
async function getDb()
{
    // We need to read asynchronously
    // We need to set the encoding format in order for the file system to get the proper file
    const jsonResult = await fs.readFile(dbPath, { encoding: `utf-8` });

    // We need to parse it from string to object of data
    const data = JSON.parse(jsonResult);

    return data;
}

// Return all the saved movies
async function getAll()
{
    const db = await getDb();

    // Return the movies
    return db.movies;
}

// A generic function for saving data to the database. First we choose the collection (used to be `async saveToDb(collection, data){}`) we want to save to, and then the data we want to save
function saveDb(data)
{
    // // First, get all of the newest data from the Db
    // const currentDbData = getDb();

    // // Get the collection from the database, and rewrite it with the new data we have sent
    // currentDbData[collection] = data;


    // Changing the function to simpler logic
    // Rewrite the whole database, not effective, but will do the job. writeFile returns a promise of void (irrelevant)
    return fs.writeFile(dbPath, JSON.stringify(data, {}, 2));
}

// createMovieController (router.post(`/create`)... > movieService (const create = () => movieData.create();) > movieData (create())
// The form submit sends the data from the controller ot the service, which in turn sends the data to the data layer as it is its job to save the form data
async function create(movieData)
{
    // Get the whole DB
    const db = await getDb();

    // Add the new movie to the movies array
    db.movies.push(movieData);

    // Save the current db as the new db (we return even though it is not important to do so)
    return saveDb(db);
}

// This is called `Anonymus export`
export default { getAll, create };