"use client";

import { DashboardWrapper } from "@/components/wrappers";
import React, { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const handleUserRole = () => {
      const savedRole = localStorage.getItem("roles");
      const role = savedRole === "import" ? savedRole : "admin";
      setUserRole(role);
      localStorage.setItem("roles", userRole);
    };

    if (typeof window !== "undefined") {
      handleUserRole();
    }
  }, [userRole]);

  return (
    <html lang="en">
      <body>
      {/* <div className="mt-20 lg:mt-0"> {children}</div> */}
        <DashboardWrapper>
          <div className="mt-20 lg:mt-0"> {children}</div>
        </DashboardWrapper>
      </body>
    </html>
  );
}
