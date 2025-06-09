"use client";

import Sidebar from "../components/ui/sideBar";
import { HeaderComponent } from "../components/ui/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      {/* Sidebar - Fixed width */}
      <div className="w-64 min-w-[16rem] bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main Content - Flexible */}
      <div className="flex-1 flex flex-col overflow-auto ">
        <HeaderComponent  />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
