import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  getSettingsService,
  updateSettingsService,
  generateApiKeyService,
} from "../service/settings.service";

export const getSettings = async (req: AuthRequest, res: Response) => {
  try {
    const company_id = req.user?.company_id!;
    const data = await getSettingsService(company_id);
    return res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSettings = async (req: AuthRequest, res: Response) => {
  try {
    const company_id = req.user?.company_id!;
    const result = await updateSettingsService(company_id, req.body);
    return res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const generateApiKey = async (req: AuthRequest, res: Response) => {
  try {
    const company_id = req.user?.company_id!;
    const result = await generateApiKeyService(company_id);
    return res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};