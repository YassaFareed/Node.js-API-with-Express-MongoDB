class ErrorResponse extends Error{
    constructor(message, statusCode){  //error message and status code
        super(message); //go to super class and pass this message
        this.statusCode = statusCode;
    }

}

module.exports = ErrorResponse;