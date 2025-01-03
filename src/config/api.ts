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

const userassociations = [
  'business',
  'roles',
  'files',
  'address',
  'account',
  'userPlans',
  'session'
];


export const loginUser = async (credentials: LoginType) => {
  try {
    const response = await apiCall.post('/api/v1/auth/login', credentials);
    // console.log("Login Submission Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting onboarding form:", error);
    throw error;
  }
};

export const forgotPassword = async (credentials: ForgotPasswordType) => {
  try {
    const response = await apiCall.post('/api/v1/auth/forgotpassword', credentials);
    // console.log("Forgot Password Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting onboarding form:", error);
    throw error;
  }
};

export const registerUser = async (credentials: CreateUserType) => {
  try {
    const response = await apiCall.post('/api/v1/auth/register', credentials);
    // console.log("User Created Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting onboarding form:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiCall.get('/api/v1/auth/logout');
    // console.log("Logout User Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting onboarding form:", error);
    throw error;
  }
};

export const fetchAllRecentUsers = async () => {
  try {
    const user: any = localStorage.getItem("user")
    const userId = user.id

    const response = await apiClient.get(`api/v1/users/get-all-users`, {
      params: {
        // associations: associations.join(','), // Convert array to comma-separated string
        associations: ["roles"],
        byRoleId: 2,
        sortOrder: 'DESC',
      },
    });
    // console.log("all user..", response.data);
    const firstTenItems = response.data.data.slice(0, 10);
    return firstTenItems;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchSingleUser = async (associations = []) => {
  try {
    const userString = localStorage.getItem("user"); // Get user data as string
    if (!userString) {
      throw new Error("User not found in local storage");
    }

    let user;
    try {
      user = JSON.parse(userString); // Attempt to parse user data
    } catch (parseError) {
      throw new Error("Invalid user data format in local storage");
    }

    // console.log("user all the result ..", user.user);

    if (!user.user || !user.user.id) {
      throw new Error("User ID not found in local storage");
    }

    const response = await apiClient.get(`/api/v1/users/get-user/${user.user.id}`, {
      params: {
        associations: userassociations, // Use passed associations or default
      },
    });


    // console.log("single user..", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Rethrow the error for handling in the component
  }
};




