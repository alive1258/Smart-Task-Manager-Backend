import mongoose from "mongoose";
import { TGenericErrorMessage } from "../interfaces/error";
import httpStatus from "http-status";

// cast error function
const handleCastError = (error: mongoose.Error.CastError) => {
  // catch erros
  const errors: TGenericErrorMessage[] = [
    {
      path: error.path,
      message: "Invalide Error.",
    },
  ];
  const statusCode = httpStatus.BAD_REQUEST;

  //retur
  return {
    statusCode,
    message: "Case Error",
    errorMessages: errors,
  };
};

export default handleCastError;
