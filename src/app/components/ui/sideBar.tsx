"use client";

import Link from "next/link";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import navigationItems from "../navigationItems";
// import icons + menu items here (as shown above)

export default function Sidebar() {
  const userRole = "admin"; // dummy value for now
  const menuItems = navigationItems[userRole] || [];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col text-black h-screen">
      <div className="p-6 border-b border-gray-200 flex items-center space-x-2">
        <LocalHospitalIcon
          className="text-[#14B8A6]"
          style={{ fontSize: 32 }}
        />
        <div>
          <h1 className="text-xl font-bold text-gray-900">MedCare HMS</h1>
          <p className="text-sm text-gray-500">Hospital Management</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2  h-screen">
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

      <Link
        href={`/${userRole}/settings`}
        className="p-4 border-t border-gray-200 text-sm flex items-center hover:bg-gray-100"
      >
        {/* <SettingsIcon className="mr-3" style={{ fontSize: 20 }} /> */}
        Settings
      </Link>
    </aside>
  );
}
