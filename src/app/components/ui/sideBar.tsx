"use client";

import Link from "next/link";

// Import Material Icons you need
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import HotelIcon from '@mui/icons-material/Hotel';
import SettingsIcon from '@mui/icons-material/Settings';


export default function Sidebar() {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
    { id: "patients", label: "Patient Management", icon: PeopleIcon, href: "/patients" },
    { id: "clinical", label: "Clinical Management", icon: LocalHospitalIcon, href: "/clinical" },
    { id: "administrative", label: "Administrative", icon: DescriptionIcon, href: "/administrative" },
    { id: "financial", label: "Financial Management", icon: AttachMoneyIcon, href: "/financial" },
    { id: "pharmacy", label: "Pharmacy", icon: LocalPharmacyIcon, href: "/pharmacy" },
    { id: "inpatient", label: "In-Patient Management", icon: HotelIcon, href: "/inpatient" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col text-black h-full">
      <div className="p-6 border-b border-gray-200 flex items-center space-x-2">
        <LocalHospitalIcon className="text-[#14B8A6]" style={{ fontSize: 32 }} />
        <div>
          <h1 className="text-xl font-bold text-gray-900">MedCare HMS</h1>
          <p className="text-sm text-gray-500">Hospital Management</p>
        </div>
      </div>

      {/* Nav takes all remaining space */}
      <nav className="flex-1 p-4 space-y-6 whitespace-nowrap overflow-auto">
        {menuItems.map(({ id, label, icon: Icon, href }) => (
          <Link
            key={id}
            href={href}
            className="flex items-center text-[12px] w-[200px] p-2 py-2 px-4 rounded-lg hover:bg-blue-200"
          >
            <Icon style={{ fontSize: 20 }} className="mr-3" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* Settings at the bottom */}
      <Link
        href="/settings"
        className="p-4 border-t text-[12px] border-gray-200 flex items-center hover:bg-gray-100"
      >
        <SettingsIcon style={{ fontSize: 20 }} className="mr-3" />
        <span>Settings</span>
      </Link>
    </aside>
  );
}


