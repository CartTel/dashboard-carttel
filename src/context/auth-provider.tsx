"use client";

import useAuth from "@/hooks/use-auth";
import React, { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { userRoleOptions } from "@/libs/data";

// type UserType = {
//   name: string;
//   email: string;
//   isEmailVerified: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   userPreferences: {
//     enable2FA: boolean;
//   };
// };

type AuthContextType = {
  user?: Object | any;
  role: string;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, isLoading, isFetching, refetch } = useAuth();
  const pathname = usePathname();

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


  // console.log("data..", roleString);
  const user = data?.user ? data?.user : savedUser.user;

  console.log("real user.", user)

  return (
    <AuthContext.Provider
      value={{ user, role, error, isLoading, isFetching, refetch }}
    >
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
