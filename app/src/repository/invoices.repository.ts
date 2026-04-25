import { pool } from "../config/db";

// get invoices
export const getInvoicesByCompany = async (company_id: number) => {
    const result = await pool.query(
        `SELECT invoice_id, customer_id, subscription_id, amount, currency, due_date, status_id
     FROM subly.invoices
     WHERE company_id = $1
     ORDER BY created_date DESC`,
        [company_id]
    );

    return result.rows;
};

// mark as paid
export const markInvoicePaid = async (invoice_id: number) => {
    await pool.query(
        `UPDATE subly.invoices
     SET status_id = 5, last_modified_date = NOW()
     WHERE invoice_id = $1`,
        [invoice_id]
    );
};