import {
    getTotalCustomers,
    getActiveSubscriptions,
    getTotalRevenue,
} from "../repository/dashboard.repository";

export const getDashboardService = async (company_id: number) => {
    const total_customers = await getTotalCustomers(company_id);
    const active_subscriptions = await getActiveSubscriptions(company_id);
    const total_revenue = await getTotalRevenue(company_id);

    return {
        total_customers,
        active_subscriptions,
        total_revenue,
    };
};