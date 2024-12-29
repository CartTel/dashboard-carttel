"use client";

// hooks/useAuth.js
import { useQuery } from "@tanstack/react-query";
import { fetchSingleUser } from "@/config/api";

const useAuth = (associations = []) => {
    const query = useQuery({
        queryKey: ["authUser"],
        queryFn: () => fetchSingleUser(associations), // Pass associations to the fetch function
        staleTime: Infinity,
    });
    return query;
};

export default useAuth;

