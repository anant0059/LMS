import Logger from "../Utils/Logger.js";
import * as Exceptions from "../Exceptions/Exceptions.js";
import CourseRepository from "../db/Repository/CourseRepository.js";
import UserRepository from "../db/Repository/UserRepository.js";
import EnrollmentRepository from "../db/Repository/EnrollmentReposioty.js";

export default class CoursesService {
  constructor() {
    this.courseRepository = new CourseRepository();
    this.userRepository = new UserRepository();
    this.enrollmentRepository = new EnrollmentRepository();
  }

  async createCourse(userDetail, args) {
    try {
      Logger.debug(
        `Creating Course with args: ${JSON.stringify(
          args
        )}, userDetail: ${JSON.stringify(userDetail)}`
      );
      const user = await this.userRepository.get({
        useremailid: userDetail.useremailid,
      });
      console.log("User for createCourse:", user);
      if (!user || user.role !== "admin") {
        throw new Exceptions.UnauthorizedException(
          "User does not have permission to create a course"
        );
      }
      const course = await this.courseRepository.create(args);
      return course;
    } catch (error) {
      Logger.error(`Error creating course: ${error.message}`);
      throw error;
    }
  }

  async getCourse(courseid) {
    try {
      Logger.debug(`Fetching Course with id: ${courseid}`);
      const course = await this.courseRepository.getCourseById(courseid);
      return course;
    } catch (error) {
      Logger.error(`Error fetching course: ${error.message}`);
      throw new Exceptions.InternalServerErrorException(
        "Failed to fetch course"
      );
    }
  }

  async enrollInCourse(params) {
    try {
      Logger.debug(
        `Enrolling in Course with params: ${JSON.stringify(params)}`
      );
      console.log("Params for enrollInCourse:", params.userid, params.courseid);
      const user = await this.userRepository.getUserById(params.userid);
      console.log("User for enrollInCourse:", user);
      if (!user) {
        throw new Exceptions.NotFoundException("User not found");
      }
      const course = await this.courseRepository.getCourseById(
        params.courseid
      );
      console.log("Course for enrollInCourse:", course);
      if (!course) {
        throw new Exceptions.NotFoundException("Course not found");
      }
      const enrollment = await this.enrollmentRepository.create({
        userid: user.userid,
        courseid: course.courseid,
      });
      return enrollment;
    } catch (error) {
      Logger.error(`Error enrolling in course: ${error.message}`);
      throw error;
    }
  }

  async getAllCourses() {
    try {
      Logger.debug(`Fetching All Courses...`);
      const courses = await this.courseRepository.getAllCourses();
      return courses;
    } catch (error) {
      Logger.error(`Error fetching all courses: ${error.message}`);
      throw new Exceptions.InternalServerErrorException(
        "Failed to fetch all courses"
      );
    }
  }

  async getCourseProgress(params) {
    try {
      Logger.debug(
        `Fetching Course Progress for courseId: ${params.courseid}, userId: ${params.userid}`
      );
      const progress = await this.enrollmentRepository.get({
        courseid: params.courseid,
        userid: params.userid,
      });
      return progress;
    } catch (error) {
      Logger.error(`Error fetching course progress: ${error.message}`);
      throw error;
    }
  }
}
