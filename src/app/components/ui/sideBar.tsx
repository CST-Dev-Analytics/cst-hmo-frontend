"use client";

import Link from "next/link";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useEffect, useState } from "react";
import navigationItems from "../navigationItems";

export default function Sidebar() {
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This runs only on client side after mount
    const role = localStorage.getItem("userRole") || "";
    const name = localStorage.getItem("userName") || "";
    setUserRole(role);
    setUserName(name);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <aside className="w-64 h-screen bg-white border-r border-gray-200 flex items-center justify-center">
        <div>Loading...</div>
      </aside>
    );
  }

  // Fallback if no role is set (shouldn't happen if logged in)
  if (!userRole) {
    return (
      <aside className="w-64 h-screen bg-white border-r border-gray-200 flex items-center justify-center">
        <div>Please login to access the system</div>
      </aside>
    );
  }

  const menuItems = navigationItems[userRole] || [];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between text-black">
      {/* Top section */}
      <div>
        <div className="p-6 border-b border-gray-200 flex items-center space-x-2">
          <LocalHospitalIcon
            className="text-[#14B8A6]"
            style={{ fontSize: 32 }}
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900">MedCare HMS</h1>
            <p className="text-sm text-gray-500">
              Welcome, {userName}
            </p>
            {/* <p className="text-xs text-gray-400 capitalize">
              {userRole} Dashboard
            </p> */}
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center text-sm p-2 rounded-md hover:bg-[#14B8A6]/20 transition"
            >
              <Icon className="mr-3" style={{ fontSize: 20 }} />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-200">
        <Link
          href={`/${userRole}/settings`}
          className="p-4 text-sm flex items-center hover:bg-gray-100"
        >
          <SettingsRoundedIcon className="mr-3" style={{ fontSize: 20 }} />
          Settings
        </Link>

        <Link
          href="/"
          className="p-4 text-sm flex items-center hover:bg-gray-100"
          onClick={() => {
            // Clear user session
            localStorage.removeItem("userRole");
            localStorage.removeItem("userName");
          }}
        >
          <LogoutRoundedIcon className="mr-3" style={{ fontSize: 20 }} />
          Logout
        </Link>
      </div>
    </aside>
  );
}