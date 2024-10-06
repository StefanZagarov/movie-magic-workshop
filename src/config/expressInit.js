// A configuration file which will clean our main file (app.js) from the express setup code

import express from "express";
import cookieParser from "cookie-parser";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export default function expressInit(app)
{
    // Set the static route - must be at the top of all `app.get/set/etc` requests (__dirpath doesn't work with modules, only with CommonJS)
    app.use(express.static(`public`));

    // In order to get the data from the `create.hbs` form, we need to be able to use req.body property. For that we need the `urlencoded` middleware (body-parser is deprecated so we need to add the option {extended: false})
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());

    app.use(authMiddleware);
}