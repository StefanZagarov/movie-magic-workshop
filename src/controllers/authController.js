import { Router } from "express";
import authService from "../services/authService.js";
import getErrorMessage from "../utils/errorUtil.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const router = Router();

// Render the register page
router.get(`/register`, isGuest, (req, res) =>
{
    res.render(`auth/register`, { title: `Register` });
});

// Handle the post request, hash the password
router.post(`/register`, isGuest, async (req, res) =>
{
    const { email, password, rePassword } = req.body;

    // Using validator to validate the email - checking defensively
    // if (!validator.isEmail(email))
    // {
    //     return res.status(400).end();
    // }

    // Validate re-password - better option
    // if (password !== password)
    // {
    //     console.log(`Passwords don't match!`);

    //     return res.status(400).end();
    // }

    try
    {
        await authService.register(email, password, rePassword);
    }
    // Unhappy path first:
    catch (error)
    {
        // Use the new error message system
        return res.render(`auth/register`, { title: `Register`, error: getErrorMessage(error), email });
    }

    // Happy path:

    // Automatic login
    const token = await authService.login(email, password);
    // Attach the token to the header
    res.cookie(`auth`, token, { httpOnly: true });


    res.redirect(`/`);
});

// Render the login page
router.get(`/login`, isGuest, (req, res) =>
{
    res.render(`auth/login`, { title: `Login` });
});

// Hanlde the login request
router.post(`/login`, isGuest, async (req, res) =>
{
    const { email, password } = req.body;

    try
    {
        const token = await authService.login(email, password);

        // Add the token to the cookie so we can form the session of the user - the token is added to the Header, if something is added to the Header, then the Controller is responsible for handling it
        res.cookie(`auth`, token, { httpOnly: true });

        res.redirect(`/`);
    }
    catch (error)
    {
        const errorMessage = getErrorMessage(error);

        res.render(`auth/login`, { title: `Login`, email, error: errorMessage });
    }

});

router.get(`/logout`, isAuth, (req, res) =>
{
    res.clearCookie(`auth`);

    res.redirect(`/`);
});

export default router;