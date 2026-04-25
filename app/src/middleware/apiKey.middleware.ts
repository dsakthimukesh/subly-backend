import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db";

export interface ApiKeyRequest extends Request {
  company_id?: number;
}

export const apiKeyMiddleware = async (
  req: ApiKeyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey = req.headers["x-api-key"] as string;

    if (!apiKey) {
      return res.status(401).json({ message: "API key missing" });
    }

    const result = await pool.query(
      `SELECT company_id FROM subly.api_keys 
       WHERE api_key = $1 AND active = 1`,
      [apiKey]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    req.company_id = result.rows[0].company_id;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};