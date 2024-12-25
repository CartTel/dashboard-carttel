import axios from "axios";

const BASE_URL = "http://localhost:6565";

const options = {
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000,
};


// Create an Axios instance
const apiClient = axios.create(options);

export const apiCall = axios.create(options);

export const APIRefresh = axios.create(options);

// Request Interceptor
apiClient.interceptors.request.use(
    (config: any) => {
        // Add any custom headers or parameters needed for onboarding
        const token: any = localStorage.getItem("user"); // Example: Retrieve auth token from localStorage

        const urlsToEncrypt = [
            "/api/v1/auth/login",
        ];

        if (urlsToEncrypt.includes(config.url)) {
            console.log("first", config)
        }

        if (token) {
            // Parse only if the value exists
            const parsedToken: any = JSON.parse(token);
            console.log("token..", parsedToken, "all the keys.."); // Use the parsed token

            config.headers.Authorization = `Bearer ${parsedToken.accessToken}`;

            // apiClient.defaults.headers.common["Authorization"] = `Bearer ${parsedToken.data.token}`;
        }

        // Add onboarding-specific parameters or headers if necessary
        if (config.url?.includes("/onboarding")) {
            config.headers["Onboarding-Flow"] = "true";
        }

        console.log("Request Config:", config); // Debugging/logging request
        return config;
    },
    (error) => {
        // Handle request error
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

APIRefresh.interceptors.response.use((response) => response);
// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        // You can handle onboarding-specific responses here
        console.log("Response Data:", response.data); // Debugging/logging response
        return response;
    },
    async (error) => {
        // Handle errors globally for onboarding processes
        if (error.response) {
            console.error("Response Error:", error.response);

            // Handle specific status codes (e.g., 401 Unauthorized)
            if (error.response.status === 401) {
                // Redirect to login or handle token refresh
                try {
                    await APIRefresh.get("/api/v1/auth/refresh");
                    return APIRefresh(error.config);
                } catch (error) {
                    window.location.href = "/";
                }
                console.warn("Unauthorized: Redirecting to login...");
            }

            // Handle onboarding-specific errors
            if (error.response.data?.onboardingError) {
                console.error("Onboarding Error:", error.response.data.message);
            }
        } else if (error.request) {
            // Request made but no response received
            console.error("No Response:", error.request);
        } else {
            // Something happened in setting up the request
            console.error("Axios Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;




