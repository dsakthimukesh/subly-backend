import { pool } from "../config/db";

// check active subscription
export const getActiveSubscription = async (customer_id: number) => {
    const result = await pool.query(
        `SELECT * FROM subly.subscriptions
     WHERE customer_id = $1 AND status_id = 1`,
        [customer_id]
    );

    return result.rows[0];
};

// expire old subscription
export const expireSubscription = async (subscription_id: number) => {
    await pool.query(
        `UPDATE subly.subscriptions
     SET status_id = 3, last_modified_date = NOW()
     WHERE subscription_id = $1`,
        [subscription_id]
    );
};

export const getPlanDetails = async (plan_id: number) => {
    const planResult = await pool.query(
        `SELECT price, billing_cycle_id FROM subly.plans WHERE plan_id = $1`,
        [plan_id]
    );

    return  planResult.rows[0];
}

// create new subscription
export const createSubscription = async (data: any) => {
    const {
        company_id,
        customer_id,
        plan_id,
        start_date,
        end_date,
    } = data;

    const result = await pool.query(
        `INSERT INTO subly.subscriptions
     (company_id, customer_id, plan_id, start_date, end_date, status_id, auto_renew, active, created_date, last_modified_date)
     VALUES ($1, $2, $3, $4, $5, 1, 1, 1, NOW(), NOW())
     RETURNING subscription_id`,
        [company_id, customer_id, plan_id, start_date, end_date]
    );

    return result.rows[0];
};

// create invoice
export const createInvoice = async (data: any) => {
    const {
        company_id,
        customer_id,
        subscription_id,
        amount,
        due_date,
    } = data;

    await pool.query(
        `INSERT INTO subly.invoices
     (company_id, customer_id, subscription_id, amount, currency, due_date, status_id, active, created_date, last_modified_date)
     VALUES ($1, $2, $3, $4, 'INR', $5, 6, 1, NOW(), NOW())`,
        [company_id, customer_id, subscription_id, amount, due_date]
    );
};

// get subscriptions
export const getSubscriptionsByCompany = async (company_id: number) => {
    const result = await pool.query(
        `SELECT s.subscription_id, s.customer_id, s.plan_id, s.start_date, s.end_date, s.status_id
     FROM subly.subscriptions s
     WHERE s.company_id = $1
     ORDER BY s.created_date DESC`,
        [company_id]
    );

    return result.rows;
};