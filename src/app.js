import express from "express";

const port = 5000;

const app = express();

app.get(`/`, (req, res) =>
{
    res.send(`Howdy!`);
});

app.listen(port, () => console.log(`Server is listening on http://localhost:5000...`));