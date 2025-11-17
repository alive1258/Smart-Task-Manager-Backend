import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// create a jwt token function
const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  // creating a jwt token string
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

// verify token function
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  // verifying token
  return jwt.verify(token, secret) as JwtPayload;
};

// export this functions in object
export const jwtHelpers = {
  createToken,
  verifyToken,
};
