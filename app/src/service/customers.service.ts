import { getCustomersByCompany, findCustomerByEmail, createCustomer, } from "../repository/customers.repository";
import { CreateCustomerRequest, CreateCustomerResponse } from "../interface/customer.interface";

export const getCustomersService = async (company_id: number) => {
    const customers = await getCustomersByCompany(company_id);

    return customers;
};


export const createCustomerService = async (
    company_id: number,
    data: CreateCustomerRequest
): Promise<CreateCustomerResponse> => {
    const { name, email, external_customer_id } = data;

    // check duplicate
    const existing = await findCustomerByEmail(company_id, email);

    if (existing) {
        throw new Error("Customer already exists");
    }

    const result = await createCustomer({
        company_id,
        name,
        email,
        external_customer_id,
    });

    return {
        message: "Customer created successfully",
        customer_id: result.customer_id,
    };
};