import 'dotenv/config';
import express from 'express';
import * as games from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  

// CREATEyay game and saves document to the database, or throws error if a problem occurs
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

// UPDATE one game based on the provided _id, or throws error if problem occurs 
app.put('/games/:_id', (req, res) => {
    games.updateGame(
        req.params._id,
        req.body.title,
        req.body.hoursToBeat,
        req.body.releaseDate
    )
    .then(game => {
        res.json(game);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({Error: 'Update of game document failed.'});
    });
});

// DELETE one game based on the provided _id, or throws error if problem persists
app.delete('/games/:_id', (req, res) => {
    games.deleteGameByID(req.params._id)
    .then(deletedCount => {
        if (deletedCount == 1){
            res.status(204).send();
        } else {
            res.status(404).json({Error: 'Game could not be found or no longer exists.'});
        }
    })
    .catch(error => {
        console.log(error);
        res.send(400).json({Error: 'Deletion of game document failed.'})
    });
});



// Sets the application to listen on port provided in .env file
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});