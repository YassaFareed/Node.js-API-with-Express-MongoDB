const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius
} = require('../controllers/bootcamps');//all these methods come from controller 

//Include other resource router so we can use the id of bootcamp
const courseRouter = require('./courses');

const router = express.Router();

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter); // send it to courses etc. to help them access by bootcampid

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius); 

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router.
    route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;// we are exporting from router