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


// "use client";

// import { ICustomInput } from '@/libs/interfaces';
// import React, { useEffect, useRef } from 'react';
// import Image from 'next/image';

// export function CustomInput({
//     errorMessage,
//           showRequirement = false,
//           value,
//           wrapperClass,
//           calendar,
//           setValue,
//           className,
//           label,
//           type,
//           id,
//           showToggle,
//           isToggle,
//           changeToggle,
//           showLabel = true,
//           inputType = "input",
//           required = false,
//           disabled = false,
//           onChange,
//           ...props
// }: ICustomInput) {
//     const inputRef = useRef<HTMLInputElement>(null);
//     const textareaRef = useRef<HTMLTextAreaElement>(null);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
//         const newValue = e.target.value;
//         if (onChange) {
//             onChange(e); // Pass the entire event if needed
//         }
//         if (setValue) {
//             setValue(newValue);
//         }
//     };

//     useEffect(() => {
//               const input = inputType === "input" ? inputRef.current : textareaRef.current;
//               if (input) {
//                 const handleInput = () => {
//                   if (input.value) {
//                     input.classList.add("has-value");
//                   } else {
//                     input.classList.remove("has-value");
//                   }
//                 };
        
//                 input.addEventListener("input", handleInput);
//                 handleInput(); // Call to set initial state
        
//                 return () => {
//                   input.removeEventListener("input", handleInput);
//                 };
//               }
//             }, [inputType]);

//     return (
//         <div className={`form-group flex w-[100%] h-[58px] text-[1rem] ${className} ${showLabel ? '' : 'unlabeled'}`}>
//             {inputType === 'input' ? (
//                 <input
//                     id={id}
//                     type={type}
//                     value={value}
//                     placeholder={showLabel ? '' : label}
//                     disabled={disabled}
//                     required={required}
//                     onChange={handleChange}
//                     ref={inputRef}
//                     {...props}
//                 />
//             ) : (
//                 <textarea
//                     id={id}
//                     value={value}
//                     placeholder={showLabel ? '' : label}
//                     disabled={disabled}
//                     required={required}
//                     onChange={handleChange}
//                     ref={textareaRef}
//                     {...props}
//                 />
//             )}
//             {showLabel && <label htmlFor={id}>{label} {showRequirement && <span className="text-red-600 text-[20px]">*</span>}</label>}
//             {showToggle && (
//                 <div
//                     className="flex mt-3 flex-col h-6 cursor-pointer"
//                     onClick={changeToggle}
//                     style={{
//                         position: "absolute",
//                         width: "30px",
//                         right: "5px",
//                         bottom: "3px",
//                         lineHeight: "20px",
//                     }}
//                 >
//                     <Image
//                         src={isToggle ? '/images/Auth/eye.svg' : '/images/Auth/eye-slash.svg'}
//                         alt="toggle visibility"
//                         width={20}
//                         height={20}
//                         priority
//                         style={{ filter: 'invert(50%) sepia(100%) saturate(0%) hue-rotate(180deg)' }}
//                     />
//                 </div>
//             )}
//             {/* {errorMessage && (
//                 <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
//             )} */}
//         </div>
//     );
// }


