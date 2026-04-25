import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
    createSubscriptionService,
    getSubscriptionsService,
} from "../service/subscriptions.service";

export const createSubscription = async (req: AuthRequest, res: Response) => {
    try {
        const company_id = req.user?.company_id;

        if (!company_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { customer_id, plan_id } = req.body;

        if (!customer_id || !plan_id) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const result = await createSubscriptionService(company_id, req.body);

        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getSubscriptions = async (req: AuthRequest, res: Response) => {
    try {
        const company_id = req.user?.company_id;

        const subs = await getSubscriptionsService(company_id!);

        return res.status(200).json(subs);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};