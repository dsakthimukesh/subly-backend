import { pool } from "../config/db";

// Find user
export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    "SELECT * FROM subly.users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

// Create company
export const createCompany = async (data: any) => {
  const { company_name, email, phone, address } = data;

  const result = await pool.query(
    `INSERT INTO subly.companies 
     (company_name, email, phone, address, plan_type_id, active, created_date, last_modified_date)
     VALUES ($1, $2, $3, $4, 1, 1, NOW(), NOW())
     RETURNING company_id`,
    [company_name, email, phone, address]
  );

  return result.rows[0];
};

// Create user
export const createUser = async (data: any) => {
  const { company_id, email, password_hash } = data;

  await pool.query(
    `INSERT INTO subly.users
     (company_id, email, password_hash, role_id, active, created_date, last_modified_date)
     VALUES ($1, $2, $3, 2, 1, NOW(), NOW())`,
    [company_id, email, password_hash]
  );
};

export const getUserByEmail = async (email: string) => {
  const result = await pool.query(
    `SELECT u.user_id, u.email, u.password_hash, u.company_id
     FROM subly.users u
     WHERE u.email = $1`,
    [email]
  );

  return result.rows[0];
};