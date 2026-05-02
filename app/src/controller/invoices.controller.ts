import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
    getInvoicesService,
    payInvoiceService,
} from "../service/invoices.service";
import { AppError } from "../utils/AppError";

export const getInvoices = async (req: AuthRequest, res: Response) => {
    try {
        const company_id = req.user?.company_id;

        if (!company_id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const invoices = await getInvoicesService(company_id);

        return res.status(200).json(invoices);
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
};

export const payInvoice = async (req: AuthRequest, res: Response) => {
    try {
        const invoice_id = Number(req.params.id);

        if (!invoice_id) {
            return res.status(400).json({ message: "Invalid invoice id" });
        }

        const result = await payInvoiceService(invoice_id);

        return res.status(200).json(result);
    } catch (error: any) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
};
