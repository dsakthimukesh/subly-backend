import { pool } from "../config/db";

// get company
export const getCompanyById = async (company_id: number) => {
    const result = await pool.query(
        `SELECT company_id, company_name, email, phone, address
     FROM subly.companies
     WHERE company_id = $1`,
        [company_id]
    );

    return result.rows[0];
};

// update company
export const updateCompany = async (company_id: number, data: any) => {
    const { company_name, phone, address } = data;

    await pool.query(
        `UPDATE subly.companies
     SET company_name = $1,
         phone = $2,
         address = $3,
         last_modified_date = NOW()
     WHERE company_id = $4`,
        [company_name, phone, address, company_id]
    );
};

// create api key
export const createApiKey = async (company_id: number, api_key: string) => {
    await pool.query(
        `INSERT INTO subly.api_keys
     (company_id, api_key, active, created_date, last_modified_date)
     VALUES ($1, $2, 1, NOW(), NOW())`,
        [company_id, api_key]
    );
}; 