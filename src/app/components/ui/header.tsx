"use client";

import {
  Bell,
  UserRound,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import Image from "next/image";

export function HeaderComponent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "";
    const name = localStorage.getItem("userName") || "";
    setUserRole(role);
    setUserName(name);
    setIsLoading(false);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const now = new Date();
  const dayNum = now.getDate();
  const month = now.toLocaleDateString("en-US", { month: "short" });
  const year = now.getFullYear();

  if (isLoading) return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center w-full flex-wrap gap-y-4">
        {/* Left side: Date */}
        <div className="flex items-end gap-2 select-none">
          <div className="text-6xl font-extrabold text-gray-800 leading-none">
            {dayNum}
          </div>
          <div className="flex flex-col leading-tight text-gray-600">
            <span className="text-sm uppercase tracking-wide font-semibold">
              {month}
            </span>
            <span className="text-xs font-light">{year}</span>
          </div>
        </div>

        {/* Right side: Search + Notifications + User */}
        <div className="flex items-center space-x-6">
          {/* Search */}
          <div className="relative w-[320px] sm:w-[400px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Image
                src="/assets/images/search.svg"
                alt="Search icon"
                width={18}
                height={18}
              />
            </span>
            <input
              type="search"
              placeholder="Search patients, doctors, records..."
              className="pl-10 pr-[90px] py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <Button
              className="absolute top-0 right-0 h-full px-4 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              onClick={() => console.log("Search triggered")}
              variant="secondary"
            >
              Search
            </Button>
          </div>

          {/* Notifications */}
          <Button
            variant="secondary"
            className="relative shadow-md"
            title="Notifications"
          >
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Dropdown */}
          <div className="relative text-right group">
            <div className="absolute right-0 text-center -bottom-10 bg-black/50 text-white text-xs px-2 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              Click to see profile
            </div>
            <Button
              onClick={toggleDropdown}
              variant="secondary"
              className="flex gap-3 items-center px-4 py-2 rounded-lg shadow-md transition"
            >
              <UserRound className="h-5 w-5" />
              <span className="hidden md:inline font-medium text-sm">
                {userName}
              </span>
            </Button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-blue-50">
                  <p className="text-sm font-semibold text-gray-800">
                    {userName || "User"}
                  </p>
                  <p className="text-xs text-blue-600 capitalize">
                    {userRole || "Role"}
                  </p>
                </div>
                <ul className="text-sm text-gray-700 divide-y divide-gray-100">
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition">
                      <LayoutDashboard size={16} className="text-blue-600" />
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition">
                      <Settings size={16} className="text-blue-600" />
                      Settings
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-red-600 transition">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
