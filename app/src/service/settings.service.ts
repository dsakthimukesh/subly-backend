import crypto from "crypto";
import {
    getCompanyById,
    updateCompany,
    createApiKey,
} from "../repository/settings.repository";

export const getSettingsService = async (company_id: number) => {
    return await getCompanyById(company_id);
};

export const updateSettingsService = async (
    company_id: number,
    data: any
) => {
    await updateCompany(company_id, data);

    return { message: "Company updated successfully" };
};

export const generateApiKeyService = async (company_id: number) => {
    const api_key = crypto.randomBytes(24).toString("hex");

    await createApiKey(company_id, api_key);

    return { api_key };
};