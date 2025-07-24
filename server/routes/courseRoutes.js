const express = require('express');
const router = express.Router();
const {
  createCourse,
  getMyCourses,
  getAllCourses,
  enrollInCourse,
  getEnrolledCourses,
} = require('../controllers/courseController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/').post(protect, teacher, createCourse).get(protect, getAllCourses);
router.route('/mycourses').get(protect, teacher, getMyCourses);
router.route('/enrolled').get(protect, getEnrolledCourses);
router.route('/:id/enroll').put(protect, enrollInCourse);

module.exports = router;