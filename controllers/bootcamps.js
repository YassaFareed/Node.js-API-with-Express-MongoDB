const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp'); //now we have our model in which we can do get delete e
//now we have a controller which controls the routes

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC                      //b/c it doesn't have token 
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success: true, count: bootcamps.length, data: bootcamps});
   
});

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Private                   //b/c we have to send the token
exports.getBootcamp =asyncHandler( async (req, res, next) => {

        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){  //this will show 404 and message if there is invalid but properly formatted id
           return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)); 
        }
        res.status(200).json({success: true, data: bootcamp});
});

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamp
// @access  PRIVATE                         //b/c it doesn't have token 
exports.createBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json(
            {
                success: true,
                data: bootcamp
            }
        );
   
});


// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  PRIVATE                //b/c we have to send the token
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //to get updated or new data
            runValidators: true, //to run validator on data as well
        });
    
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
        //res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
        res.status(200).json({success: true, data: bootcamp});
   
});


// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  PRIVATE                     //b/c it doesn't have token 
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id );//we dont need to sent anything so dont need req.body
    
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
        //res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
        res.status(200).json({success: true, data: {}});
        
});


