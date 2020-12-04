const express = require('express');
const { getCourses, getCourse, addCourse } = require('../controllers/courses');//all these methods come from controller 

const router = express.Router({ mergeParams: true }); //as we are merging the params of urls

router.route('/')
.get(getCourses)
.post(addCourse);

router
.route('/:id')
.get(getCourse);

module.exports = router;

