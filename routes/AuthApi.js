import express from "express";
import AuthController from "../app/Controllers/AuthController.js";

const AuthApiRouter = express.Router();

AuthApiRouter.post("/v1/signup", (request, response) => {
  const authController = new AuthController(response);
  authController.signUp(request);
});

AuthApiRouter.post("/v1/signin", (request, response) => {
  const authController = new AuthController(response);
  authController.signIn(request);
});

AuthApiRouter.post("/v1/refresh-token", (request, response) => {
  const authController = new AuthController(response);
  authController.refreshToken(request);
});

AuthApiRouter.post("/v1/logout", (request, response) => {
  const authController = new AuthController(response);
  authController.logout(request);
});

export default AuthApiRouter;