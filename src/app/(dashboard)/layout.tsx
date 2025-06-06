"use client"
import React, { useState } from "react";
import Sidebar from "../components/ui/sideBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [activeModule, setActiveModule] = useState("dashboard");

  return (
    <div className="flex min-h-screen">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
