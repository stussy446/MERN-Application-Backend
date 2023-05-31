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
        console.log('Successfully connected to MongoDB Games Backlog collection using Mongoose.');
    }
});

// SCHEMA: Define the collection's schema.
const gameSchema = mongoose.Schema({
    title: {type: String, required: true},
    timeToBeat: {type: Number, required: true},
    releaseDate: {type: Date, default: Date.now, required: true}
});

// Compile the model from the schema.
const game = mongoose.model("Game", gameSchema)

