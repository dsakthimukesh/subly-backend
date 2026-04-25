import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export interface AuthRequest extends Request {
  user?: {
    user_id: number;
    company_id: number;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check header exists
    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, SECRET) as {
      user_id: number;
      company_id: number;
    };

    // 4. Attach to request
    req.user = decoded;

    // 5. Continue
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};