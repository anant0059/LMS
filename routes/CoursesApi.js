import express from "express";
import CoursesController from "../app/Controllers/CoursesController.js";

const CourseApiRouter = express.Router();

CourseApiRouter.post("/v1/create", (request, response) => {
  const coursesController = new CoursesController(response);
  coursesController.createCourse(request);
});

CourseApiRouter.post("/v1/enroll", (request, response) => {
  const coursesController = new CoursesController(response);
  coursesController.enrollInCourse(request);
});

CourseApiRouter.get("/v1/courses", (request, response) => {
  const coursesController = new CoursesController(response);
  coursesController.getAllCourses(request);
});

CourseApiRouter.get("/v1/course/:courseid", (request, response) => {
  const coursesController = new CoursesController(response);
  coursesController.getCourse(request);
});

CourseApiRouter.get("/v1/progress/:courseid/users/:userid", (request, response) => {
  const coursesController = new CoursesController(response);
  coursesController.getCourseProgress(request);
});

export default CourseApiRouter;