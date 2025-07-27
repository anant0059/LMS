import Controller from "./Controller.js";
import Validator from "../Validators/Validator.js";
import AuthService from "../Services/AuthService.js";
import Logger from "../Utils/Logger.js";

export default class AuthController extends Controller {
  constructor(response) {
    super(response);
    this.authService = new AuthService();
  }

  async signUp(request) {
    try {
      Logger.debug(`Signing Up...`);
      const params = await this.validateParams(request, Validator.signUp);
      const signUpPromise = await this.authService.signUp(params);
      this.sendResponse(signUpPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async signIn(request) {
    try {
      Logger.debug(`SignIn...`);
      const params = await this.validateParams(request, Validator.signin);

      const signInPromise = await this.authService.signIn(params);
      this.sendResponse(signInPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async refreshToken(request) {
    try {
      Logger.debug(`refreshToken...`);
      const params = await this.validateParams(request, Validator.refreshToken);
      const refreshTokenPromise = await this.authService.refreshToken(params);
      this.sendResponse(refreshTokenPromise);
    } catch (error) {
      this.handleException(error);
    }
  }

  async logout(request) {
    try {
      Logger.debug(`Logout...`);
      const params = await this.validateParams(request, Validator.logout);
      const logoutPromise = await this.authService.logout(params);
      this.sendResponse(logoutPromise);
    } catch (error) {
      this.handleException(error);
    }
  }
}
