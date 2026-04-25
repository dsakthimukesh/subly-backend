import { Response } from "express";
import { ApiKeyRequest } from "../middleware/apiKey.middleware";
import { getCustomerSubscriptionService } from "../service/external.service";

export const getCustomerSubscription = async (
  req: ApiKeyRequest,
  res: Response
) => {
  try {
    const company_id = req.company_id!;
    const { external_customer_id } = req.query;

    if (!external_customer_id) {
      return res.status(400).json({ message: "Missing customer id" });
    }

    const result = await getCustomerSubscriptionService(
      company_id,
      external_customer_id as string
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};