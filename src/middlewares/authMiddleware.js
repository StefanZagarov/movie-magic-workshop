// Middleware for validating the client's cookie on each request

import jwt from "../lib/jwt.js";

// Named export
// This function deals with the logged in users, and lets the unlogged users continue
export const authMiddleware = async (req, res, next) =>
{
    // 1. Check if there is a token in the request - we will use this middleware for the public and private routes, so it needs to work in every situation, every request, so some requests might be from unlogged clients, so if someone who is unlogged wants to go to the login page we might stop them from reaching the page, which is not something we want
    // So the idea of this middleware is not to stop unauthenticated clients, but to identify who already has a token
    const token = req.cookies[`auth`];

    // Unhappy path
    if (!token)
    {
        // If the user doesn't have a token, then we let them continue
        return next();
    }

    // 2. Validate the token
    try
    {
        // Return the payload of the token, get the id - we don't get this data from the database, but from the cookie, which is a lot faster than reaching for the DB
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        // 3. Add the user data to the request - this data can then be accessed from the other modules, for example movieController, we can do `req.user.email` to check who is making this request
        // Since it uses the same instance of the `req` object, we can access the .user properties attached to the req object
        // We will use this in move details to check if the movie is created by the same user (email)

        // THIS GIVES ERROR
        // req.user._id = decodedToken._id;
        // req.user.email = decodedToken.email;

        // SET OBJECTS LIKE THIS INSTEAD
        // Since it checks and doesn't find `user` property on `res`
        const user = {
            _id: decodedToken._id,
            email: decodedToken.email
        };

        // Attach the whole data to the requests so the actions can see it
        req.user = user;
        req.isAuthenticated = true; // needed for isAuth
        // Attach parameters to the responses so the views can also see it
        res.locals.userId = user._id;
        res.locals.userEmail = user.email;
        // Since we have reached this part, that means we are authenticated, it will return either true or undefined, which thanks to JS this means false
        res.locals.isAuthenticated = true;

        // If its valid, continue
        return next();
    }
    catch (error)
    {
        // When the token is invalid, our first task is to delete the cookie
        res.clearCookie(`auth`);

        res.redirect(`/auth/login`);
    }

};

// Route guard - allows or denies access to specific routes, unline the other function above which just checks
export const isAuth = function (req, res, next)
{
    // If not authenticated 
    if (!req.isAuthenticated)
    {
        return res.redirect(`/auth/login`);
    }

    return next();
};

// Route guard - if the client is a user, he has no access to guest functionality
export function isGuest(req, res, next)
{
    if (req.user) return res.redirect(`/404`);

    // If the client is a guest, continue
    next();
}