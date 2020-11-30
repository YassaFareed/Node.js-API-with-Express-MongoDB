const express = require('express');
const dotenv = require('dotenv');
//const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');

//load env vars
dotenv.config({path: './config/config.env'});

//connect to database
connectDB();

//route files
const bootcamps = require('./routes/bootcamps');


const app = express();

// Dev logging middleware
if(process.env.NODE_ENV == 'development'){  //only to run on development mode (logger)
    app.use(morgan('dev'));
}


//Mount routes  (into the specific url)
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000; //get on port 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Handle unhandled promise rejection  (type of exceptional handling)
process.on('unhandledRejection', (err,promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(()=> process.exit(1));
});