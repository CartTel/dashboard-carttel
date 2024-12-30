"use client"

import { useMutation } from '@tanstack/react-query';

import { loginUser, forgotPassword, registerUser } from '@/config/api';
import { toast } from "@/hooks/use-toast";
import { userRoleOptions } from '@/libs/data';
import { usePathname } from "next/navigation";


// Hook for login mutation
export const useLoginMutation = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {

    const pathname = usePathname();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            console.log('Login successful:', data);
            localStorage.setItem('user', JSON.stringify(data));

            const expirationTime: number = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime.toString());

            const userString = localStorage.getItem("user")
            // const roleString = localStorage.getItem("roles")


            if (!userString) {
                throw new Error("User not found in local storage");
            }
            const savedUser = JSON.parse(userString);

            const role = userRoleOptions.find((roleOption) => pathname.includes(roleOption.value))?.value ||
                savedUser ||
                "Super Administrator";

            console.log("all the roles..", role);

            localStorage.setItem("roles", role)

            toast({
                title: "Success",
                description: `${data.message}`,
                variant: "default",
            });

            if (onSuccess) onSuccess(data); // Call the success callback
        },
        onError: (error: Error | any) => {
            console.error('Login failed:', error);
            let errorMessage = error?.response?.data.message ? error?.response?.data.message : error.message

            console.error("error in the code ..", error.message)

            toast({
                title: "Error",
                description: `${errorMessage}`,
                variant: "destructive",
            });

            if (onError) onError(error); // Call the error callback
        },
    });
};

export const useForgotPasswordMutation = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    return useMutation({
        mutationFn: forgotPassword,
        onSuccess: (data) => {
            console.log('ForgotPassword successful:', data);
            toast({
                title: "Success",
                description: `${data.message}`,
                variant: "default",
            });

            if (onSuccess) onSuccess(data); // Call the success callback
        },
        onError: (error: Error | any) => {

            console.error('ForgotPassword failed:', error);
            let errorMessage = error?.response?.data.message ? error?.response?.data.message : error.message

            toast({
                title: "Error",
                description: `${errorMessage}`,
                variant: "destructive",
            });

            if (onError) onError(error); // Call the error callback
        },
    });
};

export const useRegisterMutation = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log('Login successful:', data);
            localStorage.setItem('user', JSON.stringify(data));

            toast({
                title: "Success",
                description: `${data.message}`,
                variant: "default",
            });

            if (onSuccess) onSuccess(data); // Call the success callback
        },
        onError: (error: Error | any) => {
            console.error('Login failed:', error);
            let errorMessage = error?.response?.data.message ? error?.response?.data.message : error.message

            console.error("error in the code ..", error.message)

            toast({
                title: "Error",
                description: `${errorMessage}`,
                variant: "destructive",
            });

            if (onError) onError(error); // Call the error callback
        },
    });
};
