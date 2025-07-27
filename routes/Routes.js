import express from "express";
import HealthApiRouter from "./HealthApi.js";
import AuthApiRouter from "./AuthApi.js";

const router = express.Router();

router.use("/health", HealthApiRouter);
router.use("/auth", AuthApiRouter);

export default router;
