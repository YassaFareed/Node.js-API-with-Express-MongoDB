//async is used many times in controller so we need to make this to avoid using multiple async try catch (as it is not good practice)
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;