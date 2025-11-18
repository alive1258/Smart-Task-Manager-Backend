import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import { TLoginUserResponse, TRefreshTokenResponse } from "./auth.interface";
import httpStatus from "http-status";

// login controller  function
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;

  const result = await AuthService.loginUserService(loginData);

  // pass data to frontend
  sendResponse<TLoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully.",
    data: result,
  });
});

// refresh token controller function
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  // destructuring refreshToken from cookies
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshTokenService(refreshToken);

  sendResponse<TRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});

// forget password
// const forgetPassword = catchAsync(async (req: Request, res: Response) => {
//   //  get email from requests
//   const { email } = req.body;

//   const result = await AuthService.forgetPasswordService(email);

//   sendResponse<TRefreshTokenResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Success! Please check your email.",
//     data: result,
//   });
// });

//reset password
// const resetPassword = catchAsync(async (req: Request, res: Response) => {
//   const user = req.user;
//   const { newPassword } = req.body;

//   const result = await AuthService.resetPasswordService(user, newPassword);

//   // pass data to frontend
//   sendResponse<TLoginUserResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Password reset in successful.",
//     data: result,
//   });
// });

// export auth controllers in object
export const AuthController = {
  loginUser,
  refreshToken,
};
