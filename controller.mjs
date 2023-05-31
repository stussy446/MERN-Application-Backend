import 'dotenv/config';
import express from 'express';
import * as games from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  

// CREATE game and saves document to the database, or throws error if a problem occurs
app.post('/games', (req, res) => {
    games.createGame(
        req.body.title,
        req.body.hoursToBeat,
        req.body.releaseDate
    )
    .then(game => {
        res.status(201).json(game)
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({Error: "Creation of game failed, please confirm you have entered all fields correctly."});
    });
});

// RETRIEVE games, or throws error if a problem occurs
app.get('/games', (req, res) => {
    games.retrieveGames()
    .then(game => {
        if (game != null){
            res.json(game);
        } else {
            res.status(404).json({Error: 'No games you were looking for can be found.'})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({Error: 'Retrieval of games failed.'});
    });
});

// RETRIEVE one game based on the provided _id, or throws error if problem occurs 
app.get('/games/:_id', (req, res) =>{
    games.retrieveGameByID(req.params._id)
    .then(game => {
        if (game != null){
            res.json(game);
        } else {
            res.status(404).json({Error: 'The game you are looking for cannot be found'});
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(400).json({Error: 'Retrieval of game failed'});
    });
});



// Sets the application to listen on port provided in .env file
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});