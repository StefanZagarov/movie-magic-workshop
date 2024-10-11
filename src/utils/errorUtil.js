export default function getErrorMessage(error)
{
    // Check the error type (Error or ValidationError)
    switch (error.name)
    {
        case `ValidationError`:
            // TODO: Find a way to display all errors
            return Object.values(error.errors)[0]?.message;
        default:
            return error.message;
    }
};