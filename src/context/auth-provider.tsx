"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";

interface AuthContextProps {
  user: object | any;
  setUser?: (user: string | null) => void;
  error?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch?: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const { data, error, isLoading, isFetching, refetch } = useAuth();
  // const user = data?.data?.user;
  const router = useRouter();

  // console.log("user context", data?.user, isLoading, isFetching)

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      throw new Error("User not found in local storage");
    }

    const userString = JSON.parse(savedUser)

    // console.log("some user ..", userString?.user)

    const getUser = data?.user ? data?.user : userString?.user


    if (!getUser) {
      router.push("/auth/login"); // Redirect if not authenticated
      return;
    }

    setUser(getUser);
  }, [router, data]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const conext = useContext(AuthContext);
  if (!conext) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return conext;
};
