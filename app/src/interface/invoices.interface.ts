export interface Invoice {
    invoice_id: number;
    customer_id: number;
    subscription_id: number;
    amount: number;
    currency: string;
    due_date: string;
    status_id: number;
}