const Course = require("../models/Course.js");
const factory = require('./handlersFactory');

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};

  if (req.params.enseignantId) {
    filterObject = { educator: req.params.enseignantId };
  }

  req.filterObj = filterObject;
  next();
};

exports.getAllCourses = factory.getAll(Course); 

// Get Course By Id
exports.getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const courseData = await Course.findById(id);
                            // .populate({ path: "educator" });

    // remove lecture url if isPreviewFree is false
    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    res.json({ success: true, courseData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
