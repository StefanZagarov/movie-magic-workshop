import { Router } from "express";
import authService from "../services/authService.js";

const router = Router();

// Render the register page
router.get(`/register`, (req, res) =>
{
    res.render(`auth/register`);
});

// Handle the post request, hash the password
router.post(`/register`, async (req, res) =>
{
    const { email, password, rePassword } = req.body;

    await authService.register(email, password);

    res.redirect(`/auth/login`);
});

// Render the login page
router.get(`/login`, (req, res) =>
{
    res.render(`auth/login`);
});

// Hanlde the login request
router.post(`/login`, async (req, res) =>
{
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    // Add the token to the cookie so we can form the session of the user - the token is added to the Header, if something is added to the Header, then the Controller is responsible for handling it
    res.cookie(`auth`, token, { httpOnly: true });

    res.redirect(`/`);
});

router.get(`/logout`, (req, res) =>
{
    res.clearCookie(`auth`);

    res.redirect(`/`);
});

export default router;