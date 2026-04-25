import { pool } from "../config/db";

// check duplicate
export const findPlanByName = async (
    company_id: number,
    plan_name: string
) => {
    const result = await pool.query(
        `SELECT * FROM subly.plans
     WHERE company_id = $1 AND plan_name = $2`,
        [company_id, plan_name]
    );

    return result.rows[0];
};

// create plan
export const createPlan = async (data: any) => {
    const { company_id, plan_name, price, billing_cycle_id, features } = data;

    const result = await pool.query(
        `INSERT INTO subly.plans
     (company_id, plan_name, price, billing_cycle_id, features, active, created_date, last_modified_date)
     VALUES ($1, $2, $3, $4, $5, 1, NOW(), NOW())
     RETURNING plan_id`,
        [company_id, plan_name, price, billing_cycle_id, features]
    );

    return result.rows[0];
};

// get plans
export const getPlansByCompany = async (company_id: number) => {
    const result = await pool.query(
        `SELECT plan_id, plan_name, price, billing_cycle_id, features
     FROM subly.plans
     WHERE company_id = $1
     ORDER BY created_date DESC`,
        [company_id]
    );

    return result.rows;
};