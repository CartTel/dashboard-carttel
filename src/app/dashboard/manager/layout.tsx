"use client";

import { ManagerDashboardWrapper } from "@/components/wrappers";
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
      console.log("love in the code ..", savedRole);
      const role = savedRole === "manager" ? savedRole : "manager";
      setUserRole(role);
      localStorage.setItem("roles", userRole);
    };

    console.log("date", userRole);

    if (typeof window !== "undefined") {
      handleUserRole();
    }
  }, [userRole]);

  return (
    <html lang="en">
      <body>
      {/* <div className="mt-20 lg:mt-0"> {children}</div> */}
        <ManagerDashboardWrapper>
          <div className="mt-20 lg:mt-0"> {children}</div>
        </ManagerDashboardWrapper>
      </body>
    </html>
  );
}
