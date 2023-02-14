const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require("dotenv");
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

dotenv.config();





const app = express();





mongoose.connect('mongodb+srv://tanguy:mfbzoWqoKf6BZhrx@cluster0.fzdmasi.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



  console.log("express app.js");


app.use(express.json());
app.use("/images", express.static(path.join(__dirname, 'images')))

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);





module.exports = app;