const express = require('express');
const { getCourses } = require('../controllers/courses');//all these methods come from controller 

const router = express.Router();

router.route('/').get(getCourses);

module.exports = router;

