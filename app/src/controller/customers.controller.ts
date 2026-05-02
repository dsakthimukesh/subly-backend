import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { createCustomerService, getCustomersService } from "../service/customers.service";
import { CreateCustomerRequest } from "../interface/customer.interface";

export const getCustomers = async (req: AuthRequest, res: Response) => {
    try {
        const company_id = req.user?.company_id;

        if (!company_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const customers = await getCustomersService(company_id);

        return res.status(200).json(customers);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const createCustomer = async (
    req: AuthRequest & { body: CreateCustomerRequest },
    res: Response
) => {
    try {
        const company_id = req.user?.company_id;

        if (!company_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { name, email, external_customer_id } = req.body;

        if (!name || !email || !external_customer_id) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const result = await createCustomerService(company_id, req.body);

        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};