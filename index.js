require('dotenv').config();
import express from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// Connect to Database
mongoose.connect(process.env.MONGODB, (err) => {
  if (err) {
    console.log("Error", err);
    return;
  }
  console.log("Connected to Intentory :", process.env.MONGODB);
})

// Start Express App
const port = process.env.PORT;
const app = express();

// Models
const Album = require('./models/album');
const User = require('./models/user');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('combined'));

// Authentication Middleware pass secret as an object
// Automatically makes a token necessary
app.use(expressJwt({secret: process.env.SECRET}).unless({path:['/login','/register']}));

require('./routes')(app);

app.get('/', (req, res) => {
  res.send('Invalid API endpoint');
})

app.listen(port, () => {
  console.log('App listening on port', port);
})
