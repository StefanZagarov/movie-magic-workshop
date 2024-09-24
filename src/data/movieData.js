// Reads and writes data from the movies

import fs from "fs/promises";
// We need to get the right paths
import path from "path";

async function getDb()
{
    // Get the path of the database - it always starts reading from the root folder
    const dbPath = path.resolve(`./src/db.json`);

    // We need to read asynchronously
    // We need to set the encoding format in order for the file system to get the proper file
    const jsonResult = await fs.readFile(dbPath, { encoding: `utf-8` });

    // We need to parse it from string to object of data
    const data = JSON.parse(jsonResult);

    return data;
}


async function getMovies()
{
    const db = await getDb();

    // Return the movies
    return db.movies;
}

export default { getMovies };