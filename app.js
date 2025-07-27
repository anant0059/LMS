import express from "express";
import cors from "cors";
import Routes from "./routes/Routes.js";
import Initializer from "./app/Initializers/Initializer.js";
import Logger from "./app/Utils/Logger.js";
import config from "./config/config.js";
import { errorHandler } from "./app/Middlewares/errorHandler.js";
import prisma from "./app/db/client.js";
import cookieParser from "cookie-parser";

config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Welcome to LMS!!" });
});

app.use("/lms/api", Routes);

app.use(errorHandler);

process.on("uncaughtException", (reason) => {
  Logger.error("uncaughtException", new Error(reason));
});

// initalizing global required services and creating server
Promise.all(Initializer.intializeServices())
  .then(() => {
    app.listen(process.lms.app.port, () => {
      Logger.info(`Server Started Successfully on ${process.lms.app.port}`);
    });
  })
  .catch((error) => {
    Logger.error("InitiailizeServices", new Error(error));
  });

// graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
