import Logger from "../Utils/Logger.js";
import * as Exceptions from "../Exceptions/Exceptions.js";
import LessonRepository from "../db/Repository/LessonRepository.js";
import LessonCompletionRepository from "../db/Repository/LessonCompletionRepository.js";
import LessonResourceRepository from "../db/Repository/LessonResourceRepository.js";
import UserRepository from "../db/Repository/UserRepository.js";
import EnrollmentRepository from "../db/Repository/EnrollmentReposioty.js";
import CourseRepository from "../db/Repository/CourseRepository.js";

export default class LessonService {
  constructor() {
    this.lessonRepository = new LessonRepository();
    this.lessonCompletionRepository = new LessonCompletionRepository();
    this.userRepository = new UserRepository();
    this.lessonResourceRepository = new LessonResourceRepository();
    this.enrollmentRepository = new EnrollmentRepository();
    this.courseRepository = new CourseRepository();
  }

  async createLesson(userDetails, params) {
    try {
      Logger.debug(`Creating Lesson with params: ${JSON.stringify(params)}`);
      const user = await this.userRepository.get({
        useremailid: userDetails.useremailid,
      });
      if (!user || user.role !== "admin") {
        throw new Exceptions.UnauthorizedException(
          "User does not have permission to create a lesson"
        );
      }

      const course = await this.courseRepository.getCourseById(params.courseid);
      if (!course) {
        throw new Exceptions.NotFoundException("Course not found");
      }

      const maxOrder = await this.lessonRepository.getMaxDisplayOrder(
        course.courseid
      );
      const display_order = maxOrder + 1;

      const lesson = await this.lessonRepository.create({
        courseid: params.courseid,
        title: params.title,
        videourl: params.videourl,
        display_order: display_order,
      });
      if (!lesson) {
        throw new Exceptions.InternalServerErrorException(
          "Failed to create lesson"
        );
      }
      const resources = await Promise.all(
        params.resources.map((link) =>
          this.lessonResourceRepository.create({
            lessonid: lesson.lessonid,
            resourcelink: link,
          })
        )
      );
      return lesson;
    } catch (error) {
      Logger.error(`Error creating lesson: ${error.message}`);
      throw error;
    }
  }

  async getLesson(lessonid) {
    try {
      Logger.debug(`Fetching Lesson with ID: ${lessonid}`);
      const lesson = await this.lessonRepository.get({ lessonid: lessonid });
      if (!lesson) {
        throw new Error("Lesson not found");
      }
      return lesson;
    } catch (error) {
      Logger.error(`Error fetching lesson: ${error.message}`);
      throw error;
    }
  }

  async getAllLessons(courseid) {
    try {
      Logger.debug(`Fetching All Lessons...`);
      const lessons = await this.lessonRepository.get({ courseid: courseid });
      //   const lessonResources = await this.lessonResourceRepository.get({ lessonid: lessonid });
      return { lessons };
    } catch (error) {
      Logger.error(`Error fetching all lessons: ${error.message}`);
      throw error;
    }
  }
  async completeLesson(userDetail, params) {
    try {
      Logger.debug(`Completing Lesson with ID: ${params.lessonid}`);
      const user = await this.userRepository.get({
        userid: userDetail.userid,
      });
      if (!user) {
        throw new Exceptions.NotFoundException("User not found");
      }

      const lesson = await this.lessonRepository.get({
        lessonid: params.lessonid,
      });

      const checkEnrollment = await this.enrollmentRepository.get({
        userid: userDetail.userid,
        courseid: lesson.courseid,
      });

      if (!checkEnrollment) {
        throw new Exceptions.UnauthorizedException(
          "User is not enrolled in this course"
        );
      }

      const completion = await this.lessonCompletionRepository.create({
        userid: userDetail.userid,
        lessonid: params.lessonid,
      });

      const checkTotalLessons = await this.lessonRepository.count({
        courseid: lesson.courseid,
      });
      //   const progress_pct = Math.round(
      //     (checkTotalLessons.completedLessons / checkTotalLessons.totalLessons) * 100
      //   );
      const updateProgress = await this.enrollmentRepository.update(
        {
          enrolmentid: checkEnrollment.enrollmentid,
        },
        {
          progress_pct: checkEnrollment.progress_pct + 1,
        }
      );
      return completion;
    } catch (error) {
      Logger.error(`Error completing lesson: ${error.message}`);
      throw error;
    }
  }
}
