//database seeder so we can easily enter all the json data into the data bbase

const fs = require('fs'); //file system module (b/c we are dealing with files)
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//load env vars
dotenv.config({path: './config/config.env'});

//load models
const Bootcamp = require('./models/Bootcamp');
const connectDB = require('./config/db');

//Connect to DB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true  //without these four we will get warnings in console 
});

//Read JSOn files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8') ); //__dirname give the current dir name

//Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

//Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i'){  //in command line do node seeder -i to impoer
    importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}