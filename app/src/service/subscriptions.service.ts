import {
    getActiveSubscription,
    expireSubscription,
    createSubscription,
    createInvoice,
    getPlanDetails,
} from "../repository/subscriptions.repository";
import { pool } from "../config/db";
import { getSubscriptionsByCompany } from "../repository/subscriptions.repository";
import { CreateSubscriptionRequest } from "../interface/subscriptions.interface";

export const createSubscriptionService = async (
    company_id: number,
    data: CreateSubscriptionRequest
) => {
    const { customer_id, plan_id, start_date } = data;

    // 1. Check existing active subscription
    const existing = await getActiveSubscription(customer_id);

    if (existing) {
        await expireSubscription(existing.subscription_id);
    }

    // 2. Get plan details (price + billing cycle)
    const plan = await getPlanDetails(plan_id)

    if (!plan) {
        throw new Error("Plan not found");
    }

    // 3. Calculate dates
    const start = start_date ? new Date(start_date) : new Date();
    const end = new Date(start);

    if (plan.billing_cycle_id === 1) {
        end.setMonth(end.getMonth() + 1);
    } else {
        end.setFullYear(end.getFullYear() + 1);
    }

    // 4. Create subscription
    const sub = await createSubscription({
        company_id,
        customer_id,
        plan_id,
        start_date: start,
        end_date: end,
    });

    // 5. Create invoice
    await createInvoice({
        company_id,
        customer_id,
        subscription_id: sub.subscription_id,
        amount: plan.price,
        due_date: start,
    });

    return {
        message: "Subscription created successfully",
        subscription_id: sub.subscription_id,
    };
};

export const getSubscriptionsService = async (company_id: number) => {
    return await getSubscriptionsByCompany(company_id);
};