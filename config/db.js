const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true  //without these four we will get warnings in console 
    }); //returns a promise 

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};


module.exports = connectDB;