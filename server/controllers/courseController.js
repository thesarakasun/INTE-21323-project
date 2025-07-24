const Course = require('../models/Course');
const { courseSchema } = require('../utils/validation');

const createCourse = async (req, res, next) => {
  try {
    const { error } = courseSchema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const { title, description } = req.body;
    const course = new Course({
      title,
      description,
      teacher: req.user._id,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    next(error);
  }
};

const getMyCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ teacher: req.user._id });
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).populate('teacher', 'username');
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      if (course.students.find((s) => s.toString() === req.user._id.toString())) {
        res.status(400);
        throw new Error('Already enrolled in this course');
      }

      course.students.push(req.user._id);
      await course.save();
      res.json({ message: 'Enrolled successfully' });
    } else {
      res.status(404);
      throw new Error('Course not found');
    }
  } catch (error) {
    next(error);
  }
};

const getEnrolledCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ students: req.user._id }).populate('teacher', 'username');
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  getMyCourses,
  getAllCourses,
  enrollInCourse,
  getEnrolledCourses,
};