import axios from "axios";

const BASE_URL = "http://localhost:6565/";


// Create an Axios instance
const apiClient = axios.create({
    baseURL: BASE_URL, // Replace with your API base URL
    timeout: 10000, // Set a timeout value
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config: any) => {
        // Add any custom headers or parameters needed for onboarding
        const token: any = localStorage.getItem("user"); // Example: Retrieve auth token from localStorage

        const urlsToEncrypt = [
            "/auth/login",
        ];

        if (urlsToEncrypt.includes(config.url)) {
            console.log("first", config)
        }

        if (token) {
            // Parse only if the value exists
            const parsedToken: any = JSON.parse(token);
            console.log("token..", parsedToken, "all the keys..", parsedToken.data.token, "all the data..", parsedToken.data); // Use the parsed token

            config.headers.Authorization = `Bearer ${parsedToken.data.token}`;

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

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        // You can handle onboarding-specific responses here
        console.log("Response Data:", response.data); // Debugging/logging response
        return response;
    },
    (error) => {
        // Handle errors globally for onboarding processes
        if (error.response) {
            console.error("Response Error:", error.response);

            // Handle specific status codes (e.g., 401 Unauthorized)
            if (error.response.status === 401) {
                // Redirect to login or handle token refresh
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

