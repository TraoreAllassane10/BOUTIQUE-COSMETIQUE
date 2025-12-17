import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  // Rediriger l'utilisateur sur la page de connexion s'il n'est pas connecté
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <SidebarProvider className="bg-gray-100">
      <AppSidebar />

      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
