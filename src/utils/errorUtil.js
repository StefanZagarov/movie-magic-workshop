export default function getErrorMessage(error)
{
    // Check the error type (Error or ValidationError)
    switch (error.name)
    {
        case `ValidationError`:
            return Object.values(error.errors)[0]?.message;
        default:
            return error.message;
    }
};