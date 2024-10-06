import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: String,
    password: String
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