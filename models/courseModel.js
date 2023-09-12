import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // This field is required
    },
    description: {
      type: String,
      required: true, // This field is required
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.Course || mongoose.model('Courses', courseSchema);
export default Course;