const errHandler = (err, req, res, next) => {
    //Log to console for developer
    console.log(err.stack.red);

    res.status(500).json(
        {
            success: false,
            error: err.message
        }
    );
};

module.exports = errHandler;

//since it is middleware we use it with app.use in server.js