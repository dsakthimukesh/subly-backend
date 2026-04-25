import { getCustomerSubscription } from "../repository/external.repository";

export const getCustomerSubscriptionService = async (
  company_id: number,
  external_customer_id: string
) => {
  const data = await getCustomerSubscription(
    company_id,
    external_customer_id
  );

  if (!data) {
    return {
      status: "INACTIVE",
      plan: null,
    };
  }

  return {
    status: "ACTIVE",
    plan: data.plan_name,
  };
};