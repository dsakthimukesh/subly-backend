import { Request, Response } from "express";
import { loginService, signupService } from "../service/auth.service";
import { LoginRequest } from "../interface/auth.interface";
import { AppError } from "../utils/AppError";

export const signup = async (req: Request, res: Response) => {
  try {
    const { company_name, email, password, phone, address } = req.body;

    if (!company_name || !email || !password || !phone || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await signupService(req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const result = await loginService(req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};
