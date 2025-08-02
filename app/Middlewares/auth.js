import jwt from "jsonwebtoken";
import UserRepository from "../db/Repository/UserRepository.js";
import JWTHelper from "../Utils/JwtHelper.js";
import * as Exceptions from "../Exceptions/Exceptions.js";
import Logger from "../Utils/Logger.js";

export default async function protect(req, res, next) {
  try {
    const auth = req.headers.authorization || req.headers.Authorization;
    console.log("Authorization Header:", auth);
    if (!auth || !auth?.startsWith("Bearer ")) {
      return next(res.status(401).json({ message: "Please Provide a token" }));
    }

    const token = auth.split(" ")[1];
    console.log("Extracted Token:", token);
    if (!token) {
      return next(
        res.status(401).json({ message: "Please Provide a valid token" })
      );
    }
    console.log("Token to Verify:", token);
    const JWTHelperInstance = new JWTHelper();
    const userDetail = await JWTHelperInstance.verifyToken(token);
    console.log("User Details from Token:", userDetail);
    req.userDetail = userDetail;
    console.log("User Details:", req.userDetail);
    next();
  } catch {
    Logger.error("Invalid token");
    next(res.status(401).json({ message: "Please Provide a valid token" }));
  }
};
