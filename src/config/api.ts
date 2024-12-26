import apiClient from "./api-clients";
import axios from "axios";
import { apiCall } from "./api-clients";
import { toast } from "@/hooks/use-toast";

export type LoginType = {
  email: string;
  password: string;
};

export type ForgotPasswordType = {
  email: string;
};

export type CreateUserType = {
  firstname: string;
  lastname: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  roles: string[];
  country: string;
  hearAboutUs: string;
}


export const loginUser = async (credentials: LoginType) => {
  try {
    const response = await apiCall.post('/api/v1/auth/login', credentials);
    console.log("Login Submission Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting onboarding form:", error);
    throw error;
  }
};

export const forgotPassword = async (credentials: ForgotPasswordType) => {
  try {
    const response = await apiCall.post('/api/v1/auth/forgotpassword', credentials);
    console.log("Forgot Password Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting onboarding form:", error);
    throw error;
  }
};

export const registerUser = async (credentials: CreateUserType) => {
  try {
    const response = await apiCall.post('/api/v1/auth/register', credentials);
    console.log("User Created Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting onboarding form:", error);
    throw error;
  }
};




