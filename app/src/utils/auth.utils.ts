import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("SECRET not defined in env");
}

export const generateToken = (payload: any) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: "1d",
  });
};