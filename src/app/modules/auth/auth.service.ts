import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  TLoginUser,
  TLoginUserResponse,
  TRefreshTokenResponse,
} from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { Secret } from "jsonwebtoken";
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
    { _id: 1, email: 1, password: 1 }
  ).lean();

  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist.");
  }

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

// Service to handle refresh token
const refreshTokenService = async (
  token: string
): Promise<TRefreshTokenResponse> => {
  let verifiedToken;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { _id } = verifiedToken;

  // Find the user
  const userData = await User.findOne({ _id }, { _id: 1, password: 1 }).lean();

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

// Export AuthService object
export const AuthService = {
  loginUserService,
  refreshTokenService,
};
