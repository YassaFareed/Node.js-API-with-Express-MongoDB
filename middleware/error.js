//instead of doing the err reponse on every controller we are doing it here
const ErrorResponse = require('../utils/errorResponse');

const errHandler = (err, req, res, next) => {
    let error = { ...err };//copies the value in err to error

    error.message = err.message;


    //Log to console for developer
    console.log(err.red);

    //Mongoose bad ObjectId
    if(err.name === 'CastError'){
        const message = `Bootcamp not found with id of ${err.value}`;
        error = new ErrorResponse(message,404);
    }

    //Mongoose duplicate key  (we saw console.log and found that if there is duplicate the code 11000 is retured so based on that we added this condition,  mongoose error handling[2])
    if(err.code === 11000){
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message,400);
    }

    //Mongoose validation error  (it will give the error for required field if we create a new bootcamp empty)
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message,400);
    }

    res.status(error.statusCode || 500).json(
        {
            success: false,
            error: error.message || 'Server error'  //if no message it will say server error
        }
    );
};

module.exports = errHandler;

//since it is middleware we use it with app.use in server.js