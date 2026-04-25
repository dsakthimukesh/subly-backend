import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { getDashboardService } from "../service/dashboard.service";

export const getDashboard = async (req: AuthRequest, res: Response) => {
    try {
        const company_id = req.user?.company_id;

        if (!company_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const data = await getDashboardService(company_id);

        return res.status(200).json(data);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};