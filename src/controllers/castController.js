// Creating modular router

// 1. Import router
import { Router } from "express";
import castService from "../services/castService.js";

// 2. Create a new router
const router = Router();

// 3. Add address request handle
router.get(`/create`, (req, res) => { res.render(`cast/create`); });

router.post(`/create`, (req, res) =>
{
    const castData = req.body;

    castService.create(castData);

    res.redirect(`/`);
});

// 4. Export it, so it can be imported and used in `routes.js`
export default router;