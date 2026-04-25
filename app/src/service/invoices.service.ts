import {
    getInvoicesByCompany,
    markInvoicePaid,
} from "../repository/invoices.repository";

export const getInvoicesService = async (company_id: number) => {
    return await getInvoicesByCompany(company_id);
};

export const payInvoiceService = async (invoice_id: number) => {
    await markInvoicePaid(invoice_id);

    return {
        message: "Invoice marked as paid",
    };
};