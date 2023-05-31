import 'dotenv/config';
import express from 'express';
import * as games from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  


app.post('/games', (req, res) => {
    games.createGame(
        req.body.title,
        req.body.timeToBeat,
        req.body.releaseDate
    )
    .then(game => {
        res.status(201).json(game)
    })
    .catch(error => {
        res.status(400).json({error: "create a document failed"});
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});