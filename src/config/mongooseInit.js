import { connect } from "mongoose";

// Setup the db URL
const dbUrl = "mongodb://localhost:27017/movie-magic";

// Connect to the db - the connect function returns a promise, which means we can try-catch it
export default async function mongooseInit()
{
    try
    {
        await connect(dbUrl);
        console.log(`Successfully connected to DB`);

    } catch (error)
    {
        console.log(error.message);
    }
}