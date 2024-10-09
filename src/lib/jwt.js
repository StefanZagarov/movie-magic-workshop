// This module is used to build on top of the jsonwebtoken library
// Our goal is to create async version of the library using promises
import jsonWebToken from "jsonwebtoken";
import util from "util";

// There are two ways to do this:
// 1. Custom way (better option) - Convert callback based asynchronous function to promise based asynchronous function
// Create the same interface.It has a "token", "secretOrPublicKey" and "options";
// export const verify = function (token, secretOrPublicKey, options)
// {
//     // Inside we will create a promise, which will have an `executor` (the function)
//     const promise = new Promise((resolve, reject) =>
//     {
//         // We send everything to the original function, plus a callback - the callback accepts an error and the result
//         jsonWebToken.verify(token, secretOrPublicKey, options, (error, decoded) =>
//         {
//             // If we have an error, we reject the promise
//             if (error)
//             {
//                 return reject(error);
//             }

//             // If the are no problems we return with fufilled promise
//             resolve(decoded);
//         });
//     });

//     return promise;
// };

// 2. Using the `util` baked-in library - it does the thing above
const verify = util.promisify(jsonWebToken.verify);
const sign = util.promisify(jsonWebToken.sign);

export default { verify, sign };