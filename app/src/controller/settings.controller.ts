import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  getSettingsService,
  updateSettingsService,
  generateApiKeyService,
} from "../service/settings.service";
import { AppError } from "../utils/AppError";

export const getSettings = async (req: AuthRequest, res: Response) => {
  try {
    const company_id = req.user?.company_id!;
    const data = await getSettingsService(company_id);
    return res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req: AuthRequest, res: Response) => {
  try {
    const company_id = req.user?.company_id!;
    const result = await updateSettingsService(company_id, req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const generateApiKey = async (req: AuthRequest, res: Response) => {
  try {
    const company_id = req.user?.company_id!;
    const result = await generateApiKeyService(company_id);
    return res.status(200).json(result);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};
