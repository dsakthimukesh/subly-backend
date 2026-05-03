import { pool } from "../config/db";

export const getCustomersByCompany = async (company_id: number) => {
  const result = await pool.query(
    `SELECT c.customer_id, c.name, c.email, c.external_customer_id,
            s.status_name
     FROM subly.customers c
     LEFT JOIN subly.status s ON c.status_id = s.status_id
     WHERE c.company_id = $1
     ORDER BY c.created_date DESC`,
    [company_id]
  );

  return result.rows;
};


// check duplicate
export const findCustomerByEmail = async (
  company_id: number,
  email: string
) => {
  const result = await pool.query(
    `SELECT * FROM subly.customers 
     WHERE company_id = $1 AND email = $2`,
    [company_id, email]
  );

  return result.rows[0];
};

// insert customer
export const createCustomer = async (data: any) => {
  const { company_id, name, email, external_customer_id } = data;

  const result = await pool.query(
    `INSERT INTO subly.customers
     (company_id, name, email, external_customer_id, status_id, active, created_date, last_modified_date)
     VALUES ($1, $2, $3, $4, 1, 1, NOW(), NOW())
     RETURNING customer_id`,
    [company_id, name, email, external_customer_id]
  );

  return result.rows[0];
};