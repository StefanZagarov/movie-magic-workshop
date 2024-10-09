import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "../lib/jwt.js";

const register = (email, password) =>
{
    return User.create({ email, password });
};

const login = async (email, password) =>
{
    // Check if the user exists - search the emails for a match, return null if none found
    // Use the "happy path" method: write all the "unhappy paths" at the top, and leave the "happy path" at the bottom for easiest readability
    // Tip: Try not to nest checks (ifs)
    const user = await User.findOne({ email });

    // Unhappy path
    if (!user)
    {
        throw new Error(`The user does not exist!`);
    }

    // Validate the password
    const isValid = await bcrypt.compare(password, user.password);
    // Unhappy path
    if (!isValid)
    {
        throw new Error(`Invalid password!`);
    }

    // Finally generate the JWT - happy path
    const payload = { _id: user._id, email };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    return token;
};

export default { register, login };