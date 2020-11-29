const express = require('express');
const dotenv = require('dotenv');

//load env vars
dotenv.config({path: './config/config.env'});

const app = express();


/*
app.get('/',(req, res) =>{   //route which contains para req and response
    //res.send('Hello from express');
    res.json({name:'yassa'});//for sending json
});
*/
app.get('/api/v1/bootcamps', (req, res) => {
    res.
    status(200)
    .json({success:true, msg: 'show all bootcamp'});
});

app.get('/api/v1/bootcamps/:id', (req, res)=>{
    res.status(200).json({success:true, msg: `Show bootcamp ${req.params.id}`});
});
app.post('/api/v1/bootcamps', (req, res)=>{
    res.status(200).json({success:true, msg: 'Create new bootcamp'});
});
app.put('/api/v1/bootcamps/:id', (req, res)=>{
    res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
});
app.delete('/api/v1/bootcamps/:id', (req, res)=>{
    res.status(200).json({success:true, msg: `Delete bootcamp ${req.params.id}`});
});
const PORT = process.env.PORT || 5000; //get on port 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));