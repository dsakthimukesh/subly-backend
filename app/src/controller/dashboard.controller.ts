import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getDashboardService } from "../service/dashboard.service";
import { AppError } from "../utils/AppError";

export const getDashboard = async (req: AuthRequest, res: Response) => {
    try {
        const company_id = req.user?.company_id;

        if (!company_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const data = await getDashboardService(company_id);

        return res.status(200).json(data);
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
};
