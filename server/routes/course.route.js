const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createFilterObj,
} = require("../controller/course.controller.js");

const courseRouter = express.Router({ mergeParams: true });

courseRouter.get("/all", createFilterObj, getAllCourses);
courseRouter.get("/:id", getCourseById);

module.exports = courseRouter;
