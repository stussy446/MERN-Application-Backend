import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Games Beaten collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const gameSchema = mongoose.Schema({
    title: {type: String, required: true},
    timeToBeat: {type: Number, required: true},
    releaseDate: {type: Date, default: Date.now, required: true}
});

// Compile the model from the schema.
const Game = mongoose.model("Game", gameSchema)

// Creates new Game document 
const createGame = async (title, timeToBeat, releaseDate) => {
    const game = new Game({
        title: title,
        timeToBeat: timeToBeat,
        releaseDate: releaseDate
    });

    return game.save();
};

// Retrieves all Game documents 
const retrieveGames = async () => {
    const query = Game.find();
    return query.exec();
};

// Retrieves specific Game document by ID
const retrieveGameByID = async (_id) => {
    const query = Game.findById({_id: _id})
    return query.exec();
};

const updateGame = async (_id, title, timeToBeat, releaseDate) => {
    const result = await Game.replaceOne({_id: _id}, {
        title: title,
        timeToBeat: timeToBeat,
        releaseDate: releaseDate
    });

    return {
        _id: _id,
        title: title,
        timeToBeat: timeToBeat,
        releaseDate: releaseDate
    }
};