const Course = require("../models/Course.js");

// Get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });
      // .select(["-courseContent", "-enrolledStudents"]);
      // .populate({ path: "educator" });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

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
