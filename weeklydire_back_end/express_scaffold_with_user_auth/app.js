const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv').config();

// const eventRouter = require('./routes/eventsRouter');
const userRouter = require('./routes/usersRouter');
const commentRouter = require('./routes/commentsRouter');
const articleRouter = require('./routes/articlesRouter');
const config = require('./config');

const hostname = 'localhost';
const port = 3001;


// Configure and connect to Mongoose
const url = dotenv.parsed.MONGOURI || config.mongoUrl;
const dbConnect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

dbConnect.then(
    () => console.log(`Connected correctly to the database server.`),
    err => console.log(err)
)

const app = express();


// Set up Morgan middleware logging in dev mode
app.use(morgan('dev'));

// Set up cors policy
app.use(cors())

// Only parse query parameters into strings, not objects (see https://masteringjs.io/tutorials/express/query-parameters and https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb)
app.set('query parser', 'simple');

//
// Redirect non-secure requests to https (Commented out, because https is already used through Google Cloud Platform)
// app.all('*', (req, res, next) => {
//     if (req.secure) {
//         return next();
//     } else {
//         const secureUrl = `https://${req.hostname}:${app.get('secPort')}${req.url}`;
//         console.log(`Redirecting to secure address: ${secureUrl}`);
//         console.log(`secPort is ${app.get('secPort')}`)
//         res.redirect(308, secureUrl);
//     }
// });

// Set up json middleware for dealing with JSON data
app.use(express.json());

// Set up passprt
app.use(passport.initialize());

// Route references
app.use('/users', userRouter);
app.use('/comments', commentRouter);
app.use('/articles', articleRouter);

// Establish folder for static files
app.use(express.static(__dirname + '/public'));


// Set up a code block to work with the request (req) and response (res) in a default scenario (i.e., localhost:3001 with no additional /public or anything)
app.use((req, res) => {
    console.log('Sending default response.')
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});


// Start the server listening, and logs that it started
// Done in www.js instead now
// app.listen(port, hostname, () => {
//     console.log(`server runnning at http://${hostname}:${port}`)
// })

module.exports = app;