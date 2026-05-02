import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
    createPlanService,
    getPlansService,
} from "../service/plans.service";
import { CreatePlanRequest } from "../interface/plans.interface";

export const createPlan = async (
    req: AuthRequest & { body: CreatePlanRequest },
    res: Response
) => {
    try {
        const company_id = req.user?.company_id;

        if (!company_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { plan_name, price, billing_cycle_id, features } = req.body;

        if (!plan_name || !price || !billing_cycle_id || !features) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const result = await createPlanService(company_id, req.body);

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPlans = async (req: AuthRequest, res: Response) => {
    try {
        const company_id = req.user?.company_id;

        if (!company_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const plans = await getPlansService(company_id);

        return res.status(200).json(plans);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};