import { useMutation } from '@tanstack/react-query';

import { loginUser } from '@/config/api';
import { LoginType } from '@/config/api';
import { toast } from "@/hooks/use-toast";


// Hook for login mutation
export const useLoginMutation = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
    return useMutation({
        mutationFn: loginUser,
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

            toast({
                title: "Error",
                description: `${error?.response?.data.message}`,
                variant: "destructive",
            });

            if (onError) onError(error); // Call the error callback
        },
    });
};
