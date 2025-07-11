const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
  {
    lectureId: { type: String, required: true },
    lectureTitle: { type: String, required: true },
    lectureDuration: { type: Number, required: true },
    lectureUrl: {
      type: String,
      required: true,
    },
    isPreviewFree: {
      type: Boolean,
      required: true,
    },
    lectureOrder: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    chapterId: {
      type: String,
      required: true,
    },
    chapterOrder: {
      type: Number,
      required: true,
    },
    chapterTitle: {
      type: String,
      required: true,
    },
    chapterContent: [lectureSchema],
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    courseThumbnail: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    courseContent: [chapterSchema],
    courseRatings: [
      {
        userId: {
          type: String,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
    educator: {
      type: String,
      ref: "Enseignant",
      // required: true,
    },
    enrolledStudents: [
      {
        type: String,
        ref: "Etudiant",
      },
    ],
  },
  { timestamps: true, minimize: false }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
