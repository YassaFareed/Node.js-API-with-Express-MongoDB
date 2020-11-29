//now we have a controller which controls the routes

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC                      //b/c it doesn't have token 
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Show all bootcamps'});
}

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Private                   //b/c we have to send the token
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({success:true, msg: `Show bootcamp ${req.params.id}`});
   
}

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamp
// @access  PRIVATE                         //b/c it doesn't have token 
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({success:true, msg: 'Create new bootcamp'});
}


// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  PRIVATE                //b/c we have to send the token
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
}



// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  PRIVATE                     //b/c it doesn't have token 
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success:true, msg: `Delete bootcamp ${req.params.id}`});
}


