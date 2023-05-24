require('dotenv').config(); //Helps us access the '.env' file..
const express = require('express'); //Express makes node sooo much more easy to handle
const cookieparser = require('cookie-parser');//Helps us decode and use cookies.
const {connectToDB} = require('./handlers/dbhandler');//Separate file for handling database code.

// This is an express-app
const app = express();

// Routes
const basicroutes = require('./routes/basicroutes');
const authenticatedroutes = require('./routes/authenticatedroutes');
const wishroutes = require('./routes/wishroutes');
const { checkUser } = require('./middleware/requireAuth');
const PORT = process.env.RUNNINGPORT;

// Set up
app.use(express.static(`${__dirname}/public`)); //public folders
app.set('view engine', 'ejs'); //There are several types of view engines that you can use
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieparser()); //makes it a LOT easier to handle cookies.

app.get('*', checkUser);

// Make sure to include the routes
app.use(basicroutes); //basic functionality for the website
app.use(authenticatedroutes); //routes that require authentication
app.use(wishroutes);

app.listen(PORT, () => {
    console.log(`Server started! \nListening to port: ${PORT}`)
    connectToDB(process.env.DBCONNECTION);
});