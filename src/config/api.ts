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


export const getToken = async (id: number | string) => {
  console.log("all the params..", id)
  try {

    const response = await apiCall.get("/api/v1/token/get-token/" + id);
    console.log("Retrieve Token Successfully:", response.data);
    return response.data;
  } catch (error: Error | any) {
    // console.error("Error Getting Token:", error);
    toast({
      title: "Error",
      description: `${error?.response?.data.message}`,
      variant: "destructive",
  });
    // throw error;
  }
};



