const express = require("express");
const {
  getAllCourses,
  getCourseById,
} = require("../controller/course.controller.js");

const courseRouter = express.Router();

courseRouter.get("/all", getAllCourses);
courseRouter.get("/:id", getCourseById);

module.exports = courseRouter;
