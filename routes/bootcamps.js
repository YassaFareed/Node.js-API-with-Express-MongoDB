const express = require('express');
const router = express.Router();
/*
app.get('/',(req, res) =>{   //route which contains para req and response
    //res.send('Hello from express');
    res.json({name:'yassa'});//for sending json
});
*/
router.get('/', (req, res) => {
    res.
    status(200)
    .json({success:true, msg: 'show all bootcamp'});
});

//the route bootcamp can be known from server.js so we will remove it 
router.get('/:id', (req, res)=>{
    res.status(200).json({success:true, msg: `Show bootcamp ${req.params.id}`});
});
router.post('/', (req, res)=>{
    res.status(200).json({success:true, msg: 'Create new bootcamp'});
});
router.put('/:id', (req, res)=>{
    res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
});
router.delete('/:id', (req, res)=>{
    res.status(200).json({success:true, msg: `Delete bootcamp ${req.params.id}`});
});

module.exports = router;// we are exporting from router