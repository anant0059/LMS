import Contoller from "./Controller.js";
import CoursesService from "../Services/CoursesService.js";
import Logger from "../Utils/Logger.js";
import Validator from "../Validators/Validator.js";

export default class CoursesController extends Contoller {
  constructor(response) {
    super(response);
    this.coursesService = new CoursesService();
  }

  async createCourse(request) {
    try {
      Logger.debug(`Creating Course...`);
      const params = await this.validateParams(request, Validator.createCourse);
      console.log("Params for createCourse:", params);
      console.log("Request body for createCourse:", request.userDetail);
      const createCoursePromise = await this.coursesService.createCourse(request.userDetail, params);
      this.sendResponse(createCoursePromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async getCourse(request) {
    try {
      console.log("Request for getCourse:", request);
      Logger.debug(`Fetching Course... ${request}`);
      const getCoursePromise = await this.coursesService.getCourse(request.params.courseid);
      this.sendResponse(getCoursePromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async enrollInCourse(request) {
    try {
      Logger.debug(`Enrolling in Course...`);
      const params = await this.validateParams(request, Validator.enrollInCourse);
      const enrollPromise = await this.coursesService.enrollInCourse(params);
      this.sendResponse(enrollPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async getAllCourses(request) {
    try {
      Logger.debug(`Fetching All Courses...`);
      const getAllCoursesPromise = await this.coursesService.getAllCourses();
      this.sendResponse(getAllCoursesPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async getCourseProgress(request) {
    try {
      Logger.debug(`Fetching Course Progress...`);
      const getCourseProgressPromise = await this.coursesService.getCourseProgress(request.params);
      this.sendResponse(getCourseProgressPromise);
    } catch (error) {
      this.handleException(error);
    }
  }
}