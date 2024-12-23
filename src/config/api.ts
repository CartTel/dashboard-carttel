import apiClient from "./api-clients";

type equipmentCategoriesType = { email: string };
type OrganizationType = {
  logo: any; name: string, address: string, country_id: string;
  industry: string; code: string; contact_person: string;
  contact_email: string;  company_id: string
}

export type LoginType = {
  email: string;
  password: string;
};

export const getUsers = async () => await apiClient.get('/users');
export const getTrades = async () => await apiClient.get('/users/trades')
export const getTechnicians = async () =>  await apiClient.get('/users/technicians')
export const getOrganizations = async (company_id: string) => await apiClient.get("/organizations", {params:{company_id: company_id}});
export const getOrganizationById = async (id: string) => await apiClient.get("/organizations/"+ id);
export const getEquipmentCategories = async () => await apiClient.get('/equipments/categories');
export const getEquimentBrands = async () => await apiClient.get('/equipments/brands');
export const createOrganization = async (data: OrganizationType | any) => await apiClient.post('/organizations', data)
export const createEquipmentCategories =  async (data: equipmentCategoriesType) => await apiClient.post(`/equipments/categories`, data);

const submitEquipmentCategoriesForm = async (formData: any) => {
    try {
      const response = await apiClient.post(`/equipments/categories`, formData);
      console.log("Onboarding Submission Successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error submitting onboarding form:", error);
      throw error;
    }
};

export const loginUser = async (credentials: LoginType) => {
  try {
    const response = await apiClient.post('/api/v1/auth/login', credentials);
    console.log("Login Submission Successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting onboarding form:", error);
    throw error;
  }
};




