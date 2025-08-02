import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as Exceptions from "../Exceptions/Exceptions.js";

export default class JWTHelper {
  async generateToken(userDetails) {
    const payload = {
      useremailid: userDetails.useremailid,
      password: userDetails.password,
      role: userDetails.role,
    };

    const secret = process.lms.auth.jwt_secret;
    const options = {
      expiresIn: process.lms.auth.jwt_expires_in,
    };
    const token = jwt.sign(payload, secret, options);
    return token;
  }

  async hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  async verifyToken(token) {
    try {
      console.log("Verifying Token:", token);
      const secret = process.lms.auth.jwt_secret;
      const decoded = jwt.verify(token, secret);
      console.log("Decoded Token:", decoded);
      return decoded;
    } catch (error) {
      throw new Exceptions.PermissionDeniedException(
        "Invalid or expired token"
      );
    }
  }

  async hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return `${salt}:${hash}`;
  }

  async verifyPassword(password, hash) {
    const [salt, key] = hash.split(":");
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return crypto.timingSafeEqual(
      Buffer.from(key, "hex"),
      Buffer.from(hashedPassword, "hex")
    );
  }

  async generateRefreshToken(userDetails) {
    const payload = {
      useremailid: userDetails.useremailid,
      username: userDetails.username,
      role: userDetails.role,
    };

    const secret = process.lms.auth.jwt_secret;
    const options = {
      expiresIn: process.lms.auth.jwt_expires_refresh_in,
    };
    const refreshToken = jwt.sign(payload, secret, options);
    return refreshToken;
  }
}
