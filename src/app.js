const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/routing');
const requestLogger = require('./utilities/requestlogger'); //USER-DEFINED MIDDLEWARES for logging Requests
const errorLogger = require('./utilities/errorlogger'); //USER-DEFINED MIDDLEWARES for logging ERRORS
const cors = require("cors");
const helmet = require('helmet');

app.use(requestLogger);
app.use(cors());
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.frameguard());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

app.use(errorLogger);

//MENTION PORT NUMBER TO LISTEN ACCORDINGLY
app.listen(3200);
console.log('Server started at port 3200');