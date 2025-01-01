"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AuthProvider } from "@/context/auth-provider";
import Spinner from "@/components/ui/Spinner/Spinner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false); // Prevent rehydration mismatches
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true); // Ensure hydration is complete before rendering

    const fetchUserRole = () => {
      const savedRole = localStorage.getItem("roles");
      if (!savedRole) {
        router.push("/auth/login");
        return;
      }

      setUserRole(savedRole); // Set the role from localStorage
    };

    fetchUserRole();
  }, [router]);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner /> {/* Show loading spinner until role is determined */}
      </div>
    );
    // return null; // Prevent rendering until hydration is complete
  }

  if (!userRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner /> {/* Show loading spinner until role is determined */}
      </div>
    );
  }

  if (!pathname.includes(userRole)) {
    console.log("path name ..", userRole)
    router.push("/auth/login"); // Redirect if the user role doesn't match the URL
    return null;
  }

  return (
    <AuthProvider>
      <div>
        <div>{children}</div>
      </div>
    </AuthProvider>
  );
}
