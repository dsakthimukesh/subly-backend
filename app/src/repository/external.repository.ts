import { pool } from "../config/db";

export const getCustomerSubscription = async (
  company_id: number,
  external_customer_id: string
) => {
  const result = await pool.query(
    `SELECT s.status_id, p.plan_name
     FROM subly.customers c
     JOIN subly.subscriptions s ON c.customer_id = s.customer_id
     JOIN subly.plans p ON s.plan_id = p.plan_id
     WHERE c.external_customer_id = $1
       AND c.company_id = $2
       AND s.status_id = 1`,
    [external_customer_id, company_id]
  );

  return result.rows[0];
};