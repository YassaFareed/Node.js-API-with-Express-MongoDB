const express = require('express');
const dotenv = require('dotenv');
//const logger = require('./middleware/logger');
const morgan = require('morgan');
const colors = require('colors');
const errHandler = require('./middleware/error');
const connectDB = require('./config/db');

//load env vars
dotenv.config({path: './config/config.env'});

//connect to database
connectDB();

//route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

//Body parser
app.use(express.json());

// Dev logging middleware
if(process.env.NODE_ENV == 'development'){  //only to run on development mode (logger)
    app.use(morgan('dev'));
}


//Mount routes  (into the specific url)
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errHandler);

const PORT = process.env.PORT || 5000; //get on port 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

//Handle unhandled promise rejection  (type of exceptional handling)
process.on('unhandledRejection', (err,promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    //Close server & exit process
    server.close(()=> process.exit(1));
});