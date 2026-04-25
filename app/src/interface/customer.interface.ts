export interface CreateCustomerRequest {
    name: string;
    email: string;
    external_customer_id: string;
}

export interface CreateCustomerResponse {
    message: string;
    customer_id: number;
}