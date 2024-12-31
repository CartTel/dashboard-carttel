"use client";

import { ImportDashboardWrapper } from "@/components/wrappers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/auth-provider"; // Import the auth context


export default function ImportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false); // Prevent rehydration mismatches
  const router = useRouter();
  const { user } = useAuthContext(); // Get user and loading state from context

  useEffect(() => {
    setIsHydrated(true); // Ensure hydration is complete before rendering

    const savedRole = localStorage.getItem("roles");

    if (savedRole !== "import") {
      router.push("/auth/login"); // Redirect if user is not a manager
    }
  }, [router]);

  if (!isHydrated) {
    return null; // Prevent rendering until hydration is complete
  }

  return (
    <ImportDashboardWrapper >
      <div className="mt-20 lg:mt-0">{children}</div>
    </ImportDashboardWrapper >
  );
}

