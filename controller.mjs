import 'dotenv/config';
import express from 'express';
import * as games from './model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.
