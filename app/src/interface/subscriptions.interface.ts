export interface CreateSubscriptionRequest {
    customer_id: number;
    plan_id: number;
    start_date?: string;
}

export interface SubscriptionResponse {
    message: string;
    subscription_id: number;
}