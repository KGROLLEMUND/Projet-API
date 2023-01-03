const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRouter = require('./routes');
const errorHanding = require('./middlewares/errorHandling');
require('dotenv').config();


console.log(process.env.MONGODB_USER);

app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.1hkl3ks.mongodb.net/?retryWrites=true&w=majority`, 
).then(() => {
    console.log("Connexion à MongoDB réussie !")
}).catch(err =>console.log(err));

app.use('/api/v1', apiRouter);
app.use(errorHanding);

app.listen(process.env.PORT, function(){
    console.log('Server launch on port 3000!')
});
