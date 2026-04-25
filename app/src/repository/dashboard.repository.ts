import { pool } from "../config/db";

// total customers
export const getTotalCustomers = async (company_id: number) => {
  const result = await pool.query(
    `SELECT COUNT(*) FROM subly.customers WHERE company_id = $1`,
    [company_id]
  );

  return Number(result.rows[0].count);
};

// active subscriptions
export const getActiveSubscriptions = async (company_id: number) => {
  const result = await pool.query(
    `SELECT COUNT(*) FROM subly.subscriptions 
     WHERE company_id = $1 AND status_id = 1`,
    [company_id]
  );

  return Number(result.rows[0].count);
};

// total revenue (paid invoices)
export const getTotalRevenue = async (company_id: number) => {
  const result = await pool.query(
    `SELECT COALESCE(SUM(amount), 0) AS total
     FROM subly.invoices
     WHERE company_id = $1 AND status_id = 5`,
    [company_id]
  );

  return Number(result.rows[0].total);
};