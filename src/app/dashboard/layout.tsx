"use client";

import { AdminDashboardWrapper, ManagerDashboardWrapper, DashboardWrapper } from "@/components/wrappers";
import { usePathname } from "next/navigation";
import { userRoleOptions } from "@/libs/data";
import React, { useState, useEffect } from "react";
import { AuthProvider } from "@/context/auth-provider";
import { useRouter } from "next/navigation";

interface UserRoleOption {
  code: string;
  name: string;
  value: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleUserRole = () => {
      const savedRole = localStorage.getItem("user"); // User role or user data
      const savedRoles = localStorage.getItem("roles");

      // Redirect to login if no user exists in localStorage
      if (!savedRole) {
        router.push("/auth/login");
        return;
      }

      // Determine the user's role
      const role =
        userRoleOptions.find((roleOption) => pathname.includes(roleOption.value))?.value ||
        savedRoles ||
        "Super Administrator";

      setUserRole(role);
    };

    console.log("roles..", userRole);

    handleUserRole();
  }, [pathname, router, userRole]);

  if (!userRole) {
    return null; // Optional: Replace with a loading spinner
  }

  return (
    <html lang="en">
      <AuthProvider>
        <body>
          {userRole === "admin" ? (
            <AdminDashboardWrapper>
              <div className="mt-20 lg:mt-0">{children}</div>
            </AdminDashboardWrapper>
          ) : userRole === "manager" ? (
            <ManagerDashboardWrapper>
              <div className="mt-20 lg:mt-0">{children}</div>
            </ManagerDashboardWrapper>
          ) : (
            <DashboardWrapper>
              <div className="mt-20 lg:mt-0">{children}</div>
            </DashboardWrapper>
          )}
        </body>
      </AuthProvider>
    </html>
  );
}
