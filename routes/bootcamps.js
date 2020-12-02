const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp
} = require('../controllers/bootcamps');//all these methods come from controller 

const router = express.Router();

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