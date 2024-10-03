import { connect } from "mongoose";

// Setup the db URL
const dbUrl = "mongodb://localhost:27017/movie-magic";

// Connect to the db - the connect function returns a promise, which means we can try-catch it
export default async function mongooseInit()
{
    try
    {
        // Try to connect to the Atlas, if the url doesn't exist, then try to connect to the url above
        // const connection = process.env.DB_URL || dbUrl;

        // We will keep the non-Atlas connection by default as it keeps our movies data
        await connect(dbUrl);
        console.log(`Successfully connected to DB ${dbUrl}`);

    } catch (error)
    {
        console.log(error.message);
    }
}