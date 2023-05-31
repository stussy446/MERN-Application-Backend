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
    hoursToBeat: {type: Number, required: true},
    releaseDate: {type: Date, default: Date.now, required: true}
});

// Compile the MODEL from the schema.
const Game = mongoose.model("Game", gameSchema)

// CREATE new Game document 
const createGame = async (title, hoursToBeat, releaseDate) => {
    const game = new Game({
        title: title,
        hoursToBeat: hoursToBeat,
        releaseDate: releaseDate
    });

    return game.save();
};

// RETRIEVE all Game documents 
const retrieveGames = async () => {
    const query = Game.find();
    return query.exec();
};

// RETRIEVE specific Game document by ID
const retrieveGameByID = async (_id) => {
    const query = Game.findById({_id: _id});
    return query.exec();
};

// UPDATE specific Game by ID with the newly provided information
const updateGame = async (_id, title, hoursToBeat, releaseDate) => {
    const result = await Game.replaceOne({_id: _id}, {
        title: title,
        hoursToBeat: hoursToBeat,
        releaseDate: releaseDate
    });

    return {
        _id: _id,
        title: title,
        hoursToBeat: hoursToBeat,
        releaseDate: releaseDate
    };
};

// DELETE specific game by ID
const deleteGameByID = async (_id) => {
    const result = await Game.deleteOne({_id: _id});
    return result.deletedCount;
};


// Exports variables defined above for use in controller.mjs file 
export {createGame, retrieveGames, retrieveGameByID, updateGame, deleteGameByID};
