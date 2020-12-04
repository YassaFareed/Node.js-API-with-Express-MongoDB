const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamp'); //now we have our model in which we can do get delete e
//now we have a controller which controls the routes

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC                      //b/c it doesn't have token 
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;

    //Copy req.query
    const reqQuery = {...req.query};

    //Field to exclude
    const removeFields = ['select','sort','page', 'limit']; //as we dont want to match it with the field so we put it here

    //Loop over removeField and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    //console.log(reqQuery); //this will remove the select (shows {} in output)

    //Create query String
    let queryStr = JSON.stringify(reqQuery);

    //Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); //we added regular expression having gt|gte which indicated greater than or less than etc. that would be used, and match matches this. in to search list, and g indicates global so tat it will look further than just the first one it finds
    
   // console.log(queryStr);
    
   //Finding resource
   query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

    //Select fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');// this gives the selected key like name description
        console.log(fields);
        query = query.select(fields); //this applies select show the selected in postman output
    }
    //Sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');// this gives the selected key like name description
        query = query.sort(sortBy); //this applies select show the selected in postman output
    }else{
        query=query.sort('-createdAt'); //descending  sort createdAt attribute present in the model
    }

    //Pagination  - having limit of 1 means each page would have 1 record because there are 4 records
    const page = parseInt(req.query.page, 10) || 1; //turns to number and with radix 10, and page 1 as a default if not the first
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page-1) *limit;
    const endIndex = page *limit;
    const total = await Bootcamp.countDocuments(); //counts all the documents

    query = query.skip(startIndex).limit(limit);

   //Executing query
    const bootcamps = await query;

    //Pagination result
    const pagination = {};

    if(endIndex < total){
        pagination.next = {
            page: page +1,
            limit
        };

    }

    if(startIndex > 0){
        pagination.prev = {
            page: page -1,
            limit
        };
    }
       
    
    res.status(200).json({success: true, count: bootcamps.length, pagination, data: bootcamps});
   
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


// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance       with zipcode and distance as parameters
// @access  PRIVATE                     //b/c it doesn't have token 
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params;

    //Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //calculate radius using radians
    //divide dist by radius of earth
    //Earth Radius = 3,963 miles/ 6,378 km
    const radius = distance / 3963;

    const bootcamps = await Bootcamp.find({
       location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ]}}
    });

    res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
    });
        
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
