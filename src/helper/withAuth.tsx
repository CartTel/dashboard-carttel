"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";

interface User {
  role: string;
  [key: string]: any; // Add any additional properties your user object might have
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[] = []
) => {
  const ProtectedComponent: React.FC<P> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      const user: User | null = storedUser ? JSON.parse(storedUser) : null;

      if (!user) {
        router.push("/auth/login"); // Redirect to login if not authenticated
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized"); // Redirect if user role is not allowed
      }
    }, [router]);

    const storedUser = localStorage.getItem("user");
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;

    // Show nothing (or a loader) until the redirection logic is processed
    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
      return null; // You can render a spinner or fallback UI here
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
