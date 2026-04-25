export interface SignupRequest {
    company_name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
}

export interface SignupResponse {
    message: string;
    company_id: number;
}

export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    company_id: number;
  }