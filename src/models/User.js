import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String,
        // This adds an index to the email, effectively making it impossible to have two emails of the same type
        unique: true,
        // Minimal character length to be 10 - add custom error message
        validate: [/@[A-Za-z0-9]+.[A-Za-z0-9]+$/, `Invalid email address!`],
        minLength: [10, `Email is too short!`],
    },
    password: {
        type: String,
        validate: [/^[A-Za-z0-9]+$/, `Invalid password characters!`],
        minLength: [6, `Password is too short!`]
    }
});

// For demonstration only - creating virtual property for validating the re-password
// This validation happens on creation - the three steps are: create > validate > save
userSchema.virtual(`rePassword`).set(function (value) // Set the value of the virtual property
{
    // The value will be validated as it is set
    if (value !== this.password)
    {
        throw new Error(`Passwords don't match!`);
    }
});

// Constants are saved with this naming convention
const SALT_ROUNDS = 10;
// Hashing the password before it saves, use anonymous function expression to save the context (create closure)
userSchema.pre(`save`, async function ()
{
    // Last time first we created the salt, but this is not necessary unless we want to save the salt, we can instead directly hash - give the plain text, and the method expects either a salt or rounds, we can say directly the rounds and it will create salt internally
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    // Replace the plain password with the hash
    this.password = hash;
});

const User = model(`User`, userSchema);

export default User;