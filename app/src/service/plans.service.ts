import {
    findPlanByName,
    createPlan,
    getPlansByCompany,
} from "../repository/plans.repository";
import { CreatePlanRequest } from "../interface/plans.interface";
import { AppError } from "../utils/AppError";

export const createPlanService = async (
    company_id: number,
    data: CreatePlanRequest
) => {
    const { plan_name, price, billing_cycle_id, features } = data;

    const existing = await findPlanByName(company_id, plan_name);

    if (existing) {
        throw new AppError("Plan already exists");
    }

    const result = await createPlan({
        company_id,
        plan_name,
        price,
        billing_cycle_id,
        features
    });

    return {
        message: "Plan created successfully",
        plan_id: result.plan_id,
    };
};

export const getPlansService = async (company_id: number) => {
    return await getPlansByCompany(company_id);
};