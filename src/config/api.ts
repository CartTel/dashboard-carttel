import apiClient from "./api-clients";
import axios from "axios";
import { apiCall } from "./api-clients";
import { toast } from "@/hooks/use-toast";

import qs from 'qs';

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

export const fetchAllRecentTransaction = async () => {
  try {

    const response = await apiClient.get(`/api/v1/transactions/get-all-transactions`, {
      params: {
        associations: ['wallet', 'currency'], // Specify the relationships to include
        sortOrder: 'DESC', // Optional: sorting order
        sortBy: 'created_at', // Optional: sorting field
        page: 1, // Optional: pagination
        perPage: 100, // Optional: pagination limit
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },

    });
    console.log("all transaction..", response.data);
    const firstTenItems = response.data.data.slice(0, 10);
    console.log("result ..", firstTenItems);
    return firstTenItems;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchAllShipmentRequest = async () => {
  try {

    const response = await apiClient.get(`/api/v1/shipment/get-all-shipments`, {
      params: {
        associations: ['invoice', 'tracking', 'sla', 'insurance', 'items', 'logs'], // Specify the relationships to include
        sortOrder: 'DESC', // Optional: sorting order
        sortBy: 'updated_at', // Optional: sorting field
        page: 1, // Optional: pagination
        perPage: 100, // Optional: pagination limit
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },

    });
    console.log("all shipment..", response.data);
    const firstTenItems = response.data.data.slice(0, 10);
    console.log("result ..", firstTenItems);
    return firstTenItems;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchSingleShipmentRequest = async (id: number) => {
  try {

    const response = await apiClient.get(`/api/v1/shipment/single-shipment/${id}`, {
      params: {
        associations: ['invoice', 'tracking', 'sla', 'insurance', 'items', 'logs', 'senderInfo', 'receiverInfo', 'pickUp', 'wareHouse', 'dropOff'], // Specify the relationships to include
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },

    });
    console.log("all shipment..", response.data);
    return response.data.shipment;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const getAllStates = async () => {
  try {
    const response = await apiClient.get('/api/v1/get-all-states');
    console.log("object", response);
    return response.data;
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
};

export const getAllCountries = async () => {
  try {
    const response = await apiClient.get('/api/v1/get-all-countries');
    console.log("decision ..", response);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const getAllCities  = async () => {
  try {
    const response = await apiClient.get('/api/v1/get-all-cities');
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const fetchAllCategories = async () => {
  try {

    const response = await apiClient.get(`/api/v1/category/get-all-categories`, {
      params: { // Specify the relationships to include
        sortOrder: 'ASC', // Optional: sorting order
        sortBy: 'updated_at', // Optional: sorting field
        page: 1, // Optional: pagination
        perPage: 100, // Optional: pagination limit
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },

    });
    console.log("all categories..", response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const createShipment = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/shipment/create`, credentials);
    console.log("create shipment..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const createInvoiceShipment = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/shipment/create-invoice`, credentials);
    console.log("create shipment..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const payInvoice = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/invoice/pay-invoice`, {
      shipment_id: credentials
    });
    console.log("Pay invoice..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching pay invoice:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const approveShipment = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/shipment/approve`, credentials);
    console.log("approve shipment..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error approving shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const startShipment = async (shipmentId: number, slaId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/shipment/started`, {
      shipment_id: shipmentId,
      sla_id: slaId
    });
    console.log("started shipment..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching start shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const arrivalShipment = async (shipmentId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/shipment/arrival`, {
      shipment_id: shipmentId
    });
    console.log("arrival shipment..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching start shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const IntransitShipment = async (shipmentId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/shipment/intransit`, {
      shipment_id: shipmentId
    });
    console.log("Intransit shipment..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching start shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const CompletedShipment = async (shipmentId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/shipment/completed`, {
      shipment_id: shipmentId
    });
    console.log("completed shipment..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching start shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const arrivedShipment = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/shipment/arrive`, credentials);
    console.log("arrive shipment..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error approving shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchSingleProcurementRequest = async (id: number) => {
  try {

    const response = await apiClient.get(`/api/v1/procurement/single-procurement/${id}`, {
      params: {
        associations: ['items', 'logs'], // Specify the relationships to include
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },

    });
    console.log("all procurement..", response.data);
    return response.data.procurement;
  } catch (error) {
    console.error('Error fetching procurement:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const createProcurementRequest = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/procurement/create`, credentials);
    console.log("create procurement..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create procurement:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const updateProcurementRequest = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/procurement/update-request`, credentials);
    console.log("update procurement..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error update procurement:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const RestartProcessRequest = async (procurementId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/procurement/restart`, {
      procurement_id: procurementId
    });
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error procurement:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const ConfirmProcessRequest = async (procurementId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/procurement/confirm`, {
      procurement_id: procurementId
    });
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error procurement:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const ApprovedProcessRequest = async (procurementId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/procurement/approve`, {
      procurement_id: procurementId
    });
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error procurement:', error);
    throw error; // Rethrow the error for handling in the component
  }
};


export const awaitingProcessRequest = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/procurement/awaiting`, credentials);
    console.log("procurement..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create procurement:', error);
    throw error; // Rethrow the error for handling in the component
  }
};


export const createShipmentForProcurement = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/procurement/create-procurement-shipping`, credentials);
    console.log("create shipment for procurement..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchAllPlans = async () => {
  try {
    const response = await apiClient.get(`/api/v1/plans/get-all-plans`, {
      params: {
        associations: ['currency', 'measurement'], // Specify the relationships to include
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
    });
    // console.log("all plan..", response.data.plans);
    return response.data.plans;
  } catch (error) {
    console.error('Error fetching plan:', error);
    throw error; // Rethrow the error for handling in the component
  }
};



export const createPlan = async (planId: number, userId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/user-plan/create`, {
      userId: userId,
      planId: planId
    });

    // console.log("create plan..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create plan:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

// ADDRESS ENDPOINT 

export const createAddress = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/address/create`, credentials);

    // console.log("create plan..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create address:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const deleteAddress = async (deleteId: number) => {
  try {
    const response = await apiClient.delete(`/api/v1/delete-address/${deleteId}`);

    // console.log("create plan..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create address:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchSingleAddress = async (id: number) => {
  try {

    const response = await apiClient.get(`/api/v1/get-address/${id}`, {
      params: {
        associations: ['user'], // Specify the relationships to include
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },

    });
    // console.log("all single data..", response.data);
    return response.data.addresses;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};


export const updateAddressRequest = async (addressId: number, credentials: any) => {
  try {
    const response = await apiClient.put(`/api/v1/update-address/${addressId}`, credentials);
    // console.log("update address..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error update address:', error);
    throw error; // Rethrow the error for handling in the component
  }
};


// WAREHOUSING ENDPOINT 

export const createWarehouseRequest = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/warehouse/create`, credentials);

    console.log("create warehouse..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create warehouse:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchSingleWarehouseRequest = async (id: number) => {
  try {

    const response = await apiClient.get(`/api/v1/warehouse/single-warehouse/${id}`, {
      params: {
        associations: ['plan', 'logs'], // Specify the relationships to include
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },

    });
    console.log("all warehouse..", response.data);
    return response.data.warehouse;
  } catch (error) {
    console.error('Error fetching warehouse:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const approvedWarehouseRequest = async (warehouse_id: number) => {
  try {
    const response = await apiClient.post(`/api/v1/warehouse/approve`, {
      warehouse_id
    });
    console.log("approved warehouse",response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error warehouse:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const completedWarehouseRequest = async (warehouse_id: number) => {
  try {
    const response = await apiClient.post(`/api/v1/warehouse/completed`, {
      warehouse_id
    });
    console.log("completed warehouse",response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error warehouse:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const warehouseForDropoffRequest = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/warehouse/other-service`, credentials);
    console.log("completed warehouse",response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error warehouse:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const warehouseForPickupRequest = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/warehouse/other-service`, credentials);
    console.log("completed warehouse",response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error warehouse:', error);
    throw error; // Rethrow the error for handling in the component
  }
};


// PICKUP ENDPOINT 
export const createPickupRequest = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/pickup/create`, credentials);

    console.log("create pickup..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create pickup:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const approvedPickupRequest = async (pickupId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/pickup/approve`, {
      pickup_id: pickupId
    });
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error procurement:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const rescheduledPickupRequest = async (pickupTime: any, userId: number, pickUpId: number, pickupDate: any) => {
  try {
    const response = await apiClient.post(`/api/v1/pickup/rescheduled`, {
      user_id: userId,
      pickup_id: pickUpId,
      pickupTime: pickupTime,
      pickupDate: pickupDate
    });

    console.log("rescheduled pickup..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create plan:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const cancelledPickupRequest = async (userId: number, pickUpId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/pickup/cancelled`, {
      user_id: userId,
      pickup_id: pickUpId,
    });

    console.log("cancelled pickup..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create plan:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const completedPickupRequest = async (actualPickupTime: any, pickUpId: number) => {
  try {
    const response = await apiClient.post(`/api/v1/pickup/completed`, {
      actual_pickup_time: actualPickupTime,
      pickup_id: pickUpId,
    });

    console.log("completed pickup..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create plan:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchSinglePickupRequest = async (id: number) => {
  try {

    const response = await apiClient.get(`/api/v1/pickup/single-pickup/${id}`, {
      params: {
        associations: ['shipment', 'logs'], // Specify the relationships to include
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },

    });
    console.log("all pickup..", response.data);
    return response.data.pickup;
  } catch (error) {
    console.error('Error fetching pickup:', error);
    throw error; // Rethrow the error for handling in the component
  }
};



// DROPOFF ENDPOINT 
export const createDropoffRequest = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/dropoff/create`, credentials);

    console.log("create dropoff..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error create dropoff:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchSingleDropoffRequest = async (id: number) => {
  try {

    const response = await apiClient.get(`/api/v1/dropoff/single-dropoff/${id}`, {
      params: {
        associations: ['shipment', 'logs'], // Specify the relationships to include
      },
      paramsSerializer: (params) => {
        // Serialize params to ensure arrays are properly formatted as associations[]
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },

    });
    console.log("all dropoff.", response.data);
    return response.data.dropoffs;
  } catch (error) {
    console.error('Error fetching pickup:', error);
    throw error; // Rethrow the error for handling in the component
  }
};


export const createInvoiceDropoff = async (credentials: any) => {
  try {
    const response = await apiClient.post(`/api/v1/dropoff/create-invoice`, credentials);
    console.log("create shipment..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const payForDropoffRequest = async (dropoff_id: number, shipment_id: number) => {
  try {
    const response = await apiClient.post(`/api/v1/invoice/pay-dropoff`, 
      {
        dropoff_id,
        shipment_id
      }
    );
    console.log("invoice for dropoff..", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching dropoff:', error);
    throw error; // Rethrow the error for handling in the component
  }
};


export const approvedDropoffRequest = async (dropoff_id: number) => {
  try {
    const response = await apiClient.post(`/api/v1/dropoff/approve`, {
      dropoff_id
    });
    console.log("approved dropoff",response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error dropoff:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const intransitDropoffRequest = async (dropoff_id: number) => {
  try {
    const response = await apiClient.post(`/api/v1/dropoff/intransit`, {
      dropoff_id
    });
    console.log("intransit dropoff", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error dropoff:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const deliveredDropoffRequest = async (dropoff_id: number) => {
  try {
    const response = await apiClient.post(`/api/v1/dropoff/delivered`, {
      dropoff_id
    });
    console.log("delivered dropoff", response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error dropoff:', error);
    throw error; // Rethrow the error for handling in the component
  }
};
































