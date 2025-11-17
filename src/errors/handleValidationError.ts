import mongoose from "mongoose";
import { TGenericErrorMessage } from "../interfaces/error";
import { TGenericErrorResponse } from "../interfaces/common";
import httpStatus from "http-status";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errors: TGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: "Validation Error.",
    errorMessages: errors,
  };
};

export default handleValidationError;
