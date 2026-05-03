import { pool } from "../config/db";

// get invoices
export const getInvoicesByCompany = async (company_id: number) => {
    const result = await pool.query(
        `SELECT i.invoice_id,
                c.customer_id, c.name AS customer_name,
                i.subscription_id, i.amount, i.currency, i.due_date,
                s.status_name
         FROM subly.invoices i
         LEFT JOIN subly.customers c ON i.customer_id = c.customer_id
         LEFT JOIN subly.statuses s ON i.status_id = s.status_id
         WHERE i.company_id = $1
         ORDER BY i.created_date DESC`,
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