import express from "express";
import HealthApiRouter from "./HealthApi.js";
import AuthApiRouter from "./AuthApi.js";
import CoursesApiRouter from "./CoursesApi.js";
import protect from "../app/Middlewares/auth.js";
import LessonsApiRouter from "./LessonsApi.js";
import QuestionsApiRouter from "./QuestionsApi.js";
import QuizzesApiRouter from "./QuizzesApi.js";

const router = express.Router();

router.use("/health", HealthApiRouter);
router.use("/auth", AuthApiRouter);
router.use("/courses", protect, CoursesApiRouter);
router.use("/lessons", protect, LessonsApiRouter);
router.use("/questions", protect, QuestionsApiRouter);
router.use("/quizzes", protect, QuizzesApiRouter);

export default router;
