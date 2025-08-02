import express from "express";
import HealthApiRouter from "./HealthApi.js";
import AuthApiRouter from "./AuthApi.js";
import CoursesApiRouter from "./CoursesApi.js";
import protect from "../app/Middlewares/auth.js";

const router = express.Router();

router.use("/health", HealthApiRouter);
router.use("/auth", AuthApiRouter);
// router.use("/courses", CoursesApiRouter);
router.use("/courses", protect, CoursesApiRouter);

export default router;
