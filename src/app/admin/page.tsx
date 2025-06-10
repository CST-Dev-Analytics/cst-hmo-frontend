"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Pill, ChevronDown, AlertCircle } from "lucide-react";
import { CalendarIcon, UserIcon, HeartIcon } from "@heroicons/react/24/outline";
import LineChart from "../components/charts/MultiChartSwitcher";
import Link from "next/link";

type RecentActivity = {
  id?: string | number;
  status: string;
  type: string;
  patient: string;
  time: string;
};

type UpcomingAppointment = {
  id?: string | number;
  patient: string;
  date: string;
  time: string;
  department: string;
};

interface DashboardProps {
  upcomingAppointments?: UpcomingAppointment[];
  recentActivities?: RecentActivity[];
}

export default function Dashboard({
  upcomingAppointments = [],
  recentActivities = [],
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState("quickActions");
  const [selectedPatientType, setSelectedPatientType] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getActivePatientCount = () => {
    return (
      patientTypeData[selectedPatientType as keyof typeof patientTypeData]
        ?.count || 0
    );
  };

  const getOccupancyRate = () => {
    const data =
      patientTypeData[selectedPatientType as keyof typeof patientTypeData];
    return data ? Math.round((data.count / data.total) * 100) : 0;
  };

  const handlePatientTypeChange = (type: string) => {
    setSelectedPatientType(type);
    setDropdownOpen(false);
  };
  // Mock data for different patient types in beds
  const patientTypeData = {
    all: { count: 127, total: 150, label: "All Patients" },
    hmo: { count: 65, total: 150, label: "HMO Patients" },
    corporate: { count: 38, total: 150, label: "Corporate Patients" },
    private: { count: 24, total: 150, label: "Private Patients" },
  };

  const quickActions = [
    {
      title: "Register New Patient",
      icon: UserIcon,
      color: "text-white",
      link: "/patients/register",
    },
    {
      title: "Schedule Appointment",
      icon: CalendarIcon,
      color: "text-green-500",
      link: "/appointments/schedule",
    },
    {
      title: "Record Vitals",
      icon: HeartIcon,
      color: "text-purple-500",
      link: "/vitals/record",
    },
    {
      title: "Dispense Medication",
      icon: Pill,
      color: "text-orange-500",
      link: "/pharmacy/dispense",
    },
  ];

  const statusColors = {
    completed: { dot: "bg-green-500", badge: "bg-green-100 text-green-800" },
    "in-progress": {
      dot: "bg-yellow-500",
      badge: "bg-yellow-100 text-yellow-800",
    },
    pending: { dot: "bg-gray-400", badge: "bg-gray-100 text-gray-800" },
  };

  return (
    <main className="space-y-8 p-6 min-h-screen">
      <header className="space-y-1">
        <h1 className="text-[20px] font-bold tracking-tight text-[#14B8A6]">
          Hospital Dashboard
        </h1>
        <p className="text-gray-600 text-[10px]">
          Welcome back! Here is what is happening at your hospital today.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-[12px]">
        {/* Total Patients */}
        <div className="border border-gray-200 rounded-[20px] p-4 shadow-2xl bg-white flex flex-col justify-between h-full">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-medium">Total Doctors</h3>
            {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
            <Image
              src="/assets/images/doctor.svg"
              alt="Doctor icon"
              width={15}
              height={15}
              priority={true}
            />
          </div>
          <div className="mt-auto">
            <div className="text-[16px] font-bold">2,847</div>
            <p className="text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </div>
        </div>

        {/* Active In-Patients */}
        <div className="border border-gray-200 rounded-[20px] p-4 shadow-2xl bg-white flex flex-col justify-between h-full">
          <div className="flex flex-row items-center justify-between gap-4 pb-2 whitespace-nowrap">
            <h3 className="font-medium text-[12px] whitespace-nowrap">
              Active In-Patients
            </h3>

            {/* Dropdown container */}
            <div className="relative w-full max-w-[150px]">
              <button
                className="h-8 px-2 w-full border border-gray-300 rounded-md hover:bg-gray-100 text-[12px] flex items-center justify-between"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {
                  patientTypeData[
                    selectedPatientType as keyof typeof patientTypeData
                  ].label
                }
                <ChevronDown className="ml-1 inline h-3 w-3" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 text-[12px]">
                  <div className="py-1">
                    {Object.entries(patientTypeData).map(([key, value]) => (
                      <button
                        key={key}
                        className={`block w-full text-left px-3 py-2 hover:bg-gray-50 ${
                          selectedPatientType === key
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700"
                        }`}
                        onClick={() => handlePatientTypeChange(key)}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <div className="text-[16px] font-bold">
              {getActivePatientCount()}
            </div>
            <p className="text-[12px] text-muted-foreground">
              <span className="text-blue-600">{getOccupancyRate()}%</span> bed
              occupancy
            </p>
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="border border-gray-200 rounded-[20px] p-4 shadow-2xl bg-white flex flex-col justify-between h-full">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-medium">Today&apos;s Revenue</h3>
            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            <Image
              src="/assets/images/dollarSign.svg"
              alt="Doctor icon"
              width={15}
              height={15}
              priority={true}
            />
          </div>
          <div className="mt-auto">
            <div className="text-[16px] font-bold">₦847,230</div>
            <p className="text-muted-foreground">
              <span className="text-green-600">+8%</span> from yesterday
            </p>
          </div>
        </div>

        {/* Pending Bills */}
        <div className="border border-gray-200 rounded-[20px] p-4 shadow-2xl bg-white flex flex-col justify-between h-full">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-medium">Pending Bills</h3>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </div>
          <div className="mt-auto">
            <div className="text-[16px] font-bold">43</div>
            <p className="text-muted-foreground">
              <span className="text-orange-600">₦234,500</span> total amount
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <section
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 text-[12px]"
        aria-label="Dashboard main content"
      >
        {/* Recent Activities */}
        <section
          className="bg-white backdrop-blur-lg text-[12px] rounded-[20px] border border-gray-200 shadow-lg col-span-4"
          aria-labelledby="recent-activities-heading"
        >
          <div className="p-6 text-[12px]">
            <header className="mb-6">
              <h2
                id="recent-activities-heading"
                className="text-[12px] font-bold text-gray-900"
              >
                Recent Activities
              </h2>
              <p className="text-gray-600">
                Latest hospital activities and updates
              </p>
            </header>
            <div className="space-y-6">
              {recentActivities.length === 0 ? (
                <p className="text-gray-500 italic">
                  No recent activities available.
                </p>
              ) : (
                recentActivities.map((activity, index) => {
                  const colors =
                    statusColors[activity.status] || statusColors.pending;
                  return (
                    <article
                      key={activity.id || index}
                      className="flex items-start justify-between group hover:bg-gray-50 transition-colors p-3 rounded-lg"
                    >
                      <div className="flex items-start space-x-4">
                        <span
                          className={`mt-1.5 w-3 h-3 rounded-full ${colors.dot}`}
                          aria-label={activity.status}
                          role="status"
                        />
                        <div>
                          <p className="font-medium capitalize text-gray-900">
                            {activity.type.replace("-", " ")}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.patient}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.badge}`}
                        >
                          {activity.status.split("-").join(" ")}
                        </span>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* Right side tabs */}
        <section className="col-span-3">
          {/* Tabs Nav */}
          <nav
            className="flex space-x-4 mb-6 border-b border-gray-300"
            aria-label="Dashboard navigation tabs"
          >
            {["quickActions", "appointments", "activities", "pharmacy"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 font-semibold text-gray-900"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                  aria-selected={activeTab === tab}
                  role="tab"
                  id={`tab-${tab}`}
                  aria-controls={`tabpanel-${tab}`}
                >
                  {tab
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </button>
              )
            )}
          </nav>

          {/* Tab Panels */}
          <section
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            className="bg-white rounded-[20px] border border-gray-200 shadow-md p-6 min-h-[200px]"
          >
            {activeTab === "quickActions" && (
              <>
                <header className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Quick Actions
                  </h3>
                  <p className="text-gray-600">Frequently used functions</p>
                </header>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map(({ title, icon: Icon, color, link }) => (
                    <Link
                      key={title}
                      href={link}
                      className={`h-20 flex items-center justify-center gap-3 rounded-lg p-4 ${
                        title === "Register New Patient"
                          ? "bg-[#14B8A6]  text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${color}`} />
                      <span>{title}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {activeTab === "appointments" && (
              <>
                <header className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Upcoming Appointments
                  </h3>
                  <p className="text-gray-600">
                    Scheduled patient appointments
                  </p>
                </header>
                {upcomingAppointments.length === 0 ? (
                  <p className="text-gray-500 italic">
                    No upcoming appointments.
                  </p>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {upcomingAppointments.map((appt, i) => (
                      <li
                        key={appt.id || i}
                        className="py-2 flex justify-between"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {appt.patient}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appt.date} at {appt.time}
                          </p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {appt.department}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {activeTab === "activities" && (
              <p className="text-gray-500 italic">
                Additional activities content coming soon.
              </p>
            )}

            {activeTab === "pharmacy" && (
              <p className="text-gray-500 italic">
                Pharmacy related functions coming soon.
              </p>
            )}
          </section>
        </section>
      </section>

      <section className="bg-white rounded-[20px] border border-gray-200 shadow-md p-6 min-h-[200px]">
        <LineChart />
      </section>
    </main>
  );
}
