// Store temporary data to the server - an error that will persist two request

// Keeping the function name tempData just to remind us that this is C# inspired
export const tempData = function (req, res, next)
{
    // Add function that will store data in the response object
    res.setError = function (message)
    {
        req.session.error = {
            message,
            // Count how many times the request was made
            reqCount: 0
        };
    };

    // Check if error exists
    if (req.session.error)
    {
        // If the count of the requests is more than 0, set the error object to null because the error message has lived more than two request
        if (req.session.error.reqCount > 0)
        {
            req.session.error = null;
        }
        // If there is an error, and the counter is less than 1
        else
        {
            // Increase the request counter
            req.session.error.reqCount++;

            // Set the message - set in req.locals so it can be seen by handlebars
            res.locals.error = req.session.error.message;
        }
    }

    next();
};