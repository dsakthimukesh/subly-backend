import bcrypt from "bcrypt";
import { createCompany, createUser, findUserByEmail, getUserByEmail } from "../repository/auth.repository";
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "../interface/auth.interface";
import { generateToken } from "../utils/auth.utils";
import { AppError } from "../utils/AppError";

export const signupService = async (data: SignupRequest): Promise<SignupResponse> => {
  const { company_name, email, password, phone, address } = data;

  // Check user exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create company
  const company = await createCompany({
    company_name,
    email,
    phone,
    address,
  });

  // Create user
  await createUser({
    company_id: company.company_id,
    email,
    password_hash: hashedPassword,
  });

  return {
    message: "Signup successful",
    company_id: company.company_id,
  };
};

export const loginService = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const { email, password } = data;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new AppError("Invalid email or password");
  }

  const token = generateToken({
    user_id: user.user_id,
    company_id: user.company_id,
  });

  return {
    token,
    company_id: user.company_id,
  };
};