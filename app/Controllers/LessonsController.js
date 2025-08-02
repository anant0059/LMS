import Contoller from "./Controller.js";
import LessonsService from "../Services/LessonService.js";
import Logger from "../Utils/Logger.js";
import Validator from "../Validators/Validator.js";

export default class LessonsController extends Contoller {
    constructor(response) {
        super(response);
        this.lessonService = new LessonsService();
    }

    async createLesson(request) {
        try {
            Logger.debug(`Creating Lesson...`);
            const params = await this.validateParams(request, Validator.createLesson);
            console.log("Params for createLesson:", params);
            console.log("Request body for createLesson:", request.userDetail);
            const createLessonPromise = await this.lessonService.createLesson(request.userDetail, params);
            this.sendResponse(createLessonPromise);
        } catch (error) {
            this.handleException(error);
        }
    }

    async getLesson(request) {
        try {
            console.log("Request for getLesson:", request);
            Logger.debug(`Fetching Lesson... ${request}`);
            const getLessonPromise = await this.lessonService.getLesson(request.params.lessonid);
            this.sendResponse(getLessonPromise);
        } catch (error) {
            this.handleException(error);
        }
    }

    async getAllLessons(request) {
        try {
            Logger.debug(`Fetching All Lessons...`);
            const getAllLessonsPromise = await this.lessonService.getAllLessons(request.params.courseid);
            this.sendResponse(getAllLessonsPromise);
        } catch (error) {
            this.handleException(error);
        }
    }

    async completeLesson(request) {
        try {
            Logger.debug(`Completing Lesson...`);
            const params = await this.validateParams(request, Validator.completeLesson);
            const completeLessonPromise = await this.lessonService.completeLesson(request.userDetail, params);
            this.sendResponse(completeLessonPromise);
        } catch (error) {
            this.handleException(error);
        }
    }
}