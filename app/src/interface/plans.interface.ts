export interface CreatePlanRequest {
    plan_name: string;
    price: number;
    billing_cycle_id: number;
    features?: string;
}

export interface Plan {
    plan_id: number;
    plan_name: string;
    price: number;
    billing_cycle_id: number;
    features?: string;
}