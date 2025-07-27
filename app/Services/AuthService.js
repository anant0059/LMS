import UserRepository from "../db/Repository/UserRepository.js";
import RefreshTokenRepository from "../db/Repository/RefreshTokenRepository.js";
import JWTHelper from "../Utils/JwtHelper.js";
import * as Exceptions from "../Exceptions/Exceptions.js"
import Logger from "../Utils/Logger.js";

export default class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.refreshTokenRepository = new RefreshTokenRepository();
    this.JWTHelper = new JWTHelper();
  }

  async signUp(args) {
    try {
      const { useremailid, username, password, role } = args;
      let user = await this.userRepository.getUserByEmail(useremailid);
      if (user) {
        throw new Exceptions.InternalServerErrorException(
          "User already exist with this mailid"
        );
      }

      const hashPassword = await this.JWTHelper.hashPassword(password);
      user = await this.userRepository.create({
        useremailid: useremailid,
        username: username,
        password: hashPassword,
        role: role,
      })
      const token = await this.JWTHelper.generateToken({
        useremailid,
        username,
        password: hashPassword,
      });
      const refreshToken = await this.JWTHelper.generateRefreshToken({
        useremailid,
        username,
        password: hashPassword,
      });
      const hashRefreshToken = await this.JWTHelper.hashToken(refreshToken);
      await this.refreshTokenRepository.create({
        userid: user.userid,
        tokenHash: hashRefreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return { token: token, refreshToken: refreshToken };
    } catch (error) {
        Logger.error(`Error During SignUp ${error}`);
      throw error;
    }
  }

  async signIn(args) {
    try {
      const { useremailid, password } = args;
      const user = await this.userRepository.getUserByEmail(useremailid);

      if (!user) {
        throw new Exceptions.InternalServerErrorException("User not found");
      }

      if (! await this.JWTHelper.verifyPassword(password, user.password)) {
        throw new Exceptions.UnauthorizedException("Invalid password");
      }

      await this.refreshTokenRepository.revokeAllForUser(user.userid);

      const token = await this.JWTHelper.generateToken({
        useremailid,
        username:user.username,
        password: user.password,
      });
      const refreshToken = await this.JWTHelper.generateRefreshToken({
        useremailid,
        username:user.username,
        password: user.password,
      });
      const hashRefreshToken = await this.JWTHelper.hashToken(refreshToken);

      await this.refreshTokenRepository.create({
        userid: user.userid,
        tokenHash: hashRefreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return { token: token, refreshToken: refreshToken };

    } catch (error) {
        Logger.error(`Error During SignIn ${error}`);
      throw error;
    }
  }

  async refreshToken(args) {
    try{
        const { refreshToken } = args;
        const tokenHash = await this.JWTHelper.hashToken(refreshToken);
        const dbToken = await this.refreshTokenRepository.getByHash(tokenHash);
        if(!dbToken || dbToken.revoked || dbToken.expires_at < new Date()) {
            throw new Exceptions.UnauthorizedException("Invalid refresh token");
        }

        const user = await this.userRepository.getUserById(dbToken.userid)

        const newToken = await this.JWTHelper.generateToken({
            useremailid: user.useremailid,
            username: user.username,
            password: user.password,
        });
        const newRefreshToken = await this.JWTHelper.generateRefreshToken({
            useremailid: user.useremailid,
            username: user.username,
            password: user.password,
        }); 

        const newHashRefreshToken = await this.JWTHelper.hashToken(newRefreshToken);

        await this.refreshTokenRepository.create({
            userid: dbToken.userid,
            tokenHash: newHashRefreshToken,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return { token: newToken, refreshToken: newRefreshToken };
    } catch (error) {
        Logger.error(`Error During refreshToken ${error}`);
    }
  }

  async logout(args) {
    try{
        const { refreshToken } = args;
        const tokenHash = await this.JWTHelper.hashToken(refreshToken);
        await this.refreshTokenRepository.revokeByHash(tokenHash);
        return {message: "Logged out"};
    } catch(error) {
        Logger.error(`Error During logout ${error}`);
    }
  }
}
