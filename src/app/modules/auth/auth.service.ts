import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  TLoginUser,
  TLoginUserResponse,
  TRefreshTokenResponse,
} from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { Secret, JwtPayload } from "jsonwebtoken";
import { User } from "../users/user.module";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

// Service to handle user login
const loginUserService = async (
  loginData: TLoginUser
): Promise<TLoginUserResponse> => {
  const { email, password } = loginData;

  // Find the user by email
  const userData = await User.findOne(
    { email },
    { _id: 1, email: 1, password: 1 } // only needed fields
  ).lean();

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  // Compare passwords
  const isPasswordMatched = await bcrypt.compare(password, userData.password);
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect.");
  }

  // Generate tokens
  const accessToken = jwtHelpers.createToken(
    { _id: userData._id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id: userData._id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return { accessToken, refreshToken };
};

// Service to refresh access token
const refreshTokenService = async (
  token: string
): Promise<TRefreshTokenResponse> => {
  let verifiedToken: JwtPayload;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    ) as JwtPayload;
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { _id } = verifiedToken;
  const userData = await User.findById(_id, { _id: 1 }).lean();

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  const newAccessToken = jwtHelpers.createToken(
    { _id: userData._id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return { accessToken: newAccessToken };
};

// Service to reset password
const resetPasswordService = async (
  user: JwtPayload | null,
  newPassword: string
): Promise<TLoginUserResponse> => {
  if (!user?._id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid user data.");
  }

  const userData = await User.findById(user._id);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

  userData.password = newPassword;
  await userData.save();

  // Auto-login after password reset
  return loginUserService({ email: userData.email, password: newPassword });
};

// Export auth service
export const AuthService = {
  loginUserService,
  refreshTokenService,
  resetPasswordService,
};
