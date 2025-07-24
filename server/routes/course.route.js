const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createFilterObj,
  deleteCourse,
} = require("../controller/course.controller.js");

const courseRouter = express.Router({ mergeParams: true });

courseRouter.get("/all", createFilterObj, getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.delete("/:id", deleteCourse);

module.exports = courseRouter;
