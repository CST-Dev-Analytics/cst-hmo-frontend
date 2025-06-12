// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { Pill, ChevronDown, AlertCircle } from "lucide-react";
// import { CalendarIcon, UserIcon, HeartIcon } from "@heroicons/react/24/outline";
// import LineChart from "../../components/charts/MultiChartSwitcher";
// import Link from "next/link";

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Pill, ChevronDown, AlertCircle } from "lucide-react";
import { CalendarIcon, UserIcon, HeartIcon } from "@heroicons/react/24/outline";
import LineChart from "../../components/charts/MultiChartSwitcher";
import Link from "next/link";
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("quickActions");
  const [selectedPatientType, setSelectedPatientType] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mock data for different patient types in beds
  const patientTypeData = {
    all: { count: 127, total: 150, label: "All Patients" },
    hmo: { count: 65, total: 150, label: "HMO Patients" },
    corporate: { count: 38, total: 150, label: "Corporate Patients" },
    private: { count: 24, total: 150, label: "Private Patients" },
  };

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "patient-admission",
      patient: "John Doe",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "surgery-scheduled",
      patient: "Jane Smith",
      time: "4 hours ago",
      status: "in-progress",
    },
    {
      id: 3,
      type: "medication-dispensed",
      patient: "Bob Johnson",
      time: "6 hours ago",
      status: "completed",
    },
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      patient: "Alice Brown",
      date: "Today",
      time: "2:00 PM",
      department: "Cardiology",
    },
    {
      id: 2,
      patient: "Charlie Wilson",
      date: "Today",
      time: "3:30 PM",
      department: "Orthopedics",
    },
    {
      id: 3,
      patient: "Diana Davis",
      date: "Tomorrow",
      time: "9:00 AM",
      department: "Pediatrics",
    },
  ];

  const getActivePatientCount = () => {
    if (selectedPatientType === "all") return patientTypeData.all.count;
    if (selectedPatientType === "hmo") return patientTypeData.hmo.count;
    if (selectedPatientType === "corporate")
      return patientTypeData.corporate.count;
    if (selectedPatientType === "private") return patientTypeData.private.count;
    return 0;
  };

  const getOccupancyRate = () => {
    let data;
    if (selectedPatientType === "all") data = patientTypeData.all;
    else if (selectedPatientType === "hmo") data = patientTypeData.hmo;
    else if (selectedPatientType === "corporate")
      data = patientTypeData.corporate;
    else if (selectedPatientType === "private") data = patientTypeData.private;

    return data ? Math.round((data.count / data.total) * 100) : 0;
  };

  const handlePatientTypeChange = (type) => {
    setSelectedPatientType(type);
    setDropdownOpen(false);
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
        {/* Total Doctors */}
        <div className="border border-gray-200 rounded-[20px] p-4 shadow-2xl bg-white flex flex-col justify-between h-full">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="font-medium">Total Doctors</h3>
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
                {selectedPatientType === "all"
                  ? patientTypeData.all.label
                  : selectedPatientType === "hmo"
                  ? patientTypeData.hmo.label
                  : selectedPatientType === "corporate"
                  ? patientTypeData.corporate.label
                  : patientTypeData.private.label}
                <ChevronDown className="ml-1 inline h-3 w-3" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 text-[12px]">
                  <div className="py-1">
                    <button
                      className={`block w-full text-left px-3 py-2 hover:bg-gray-50 ${
                        selectedPatientType === "all"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                      onClick={() => handlePatientTypeChange("all")}
                    >
                      {patientTypeData.all.label}
                    </button>
                    <button
                      className={`block w-full text-left px-3 py-2 hover:bg-gray-50 ${
                        selectedPatientType === "hmo"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                      onClick={() => handlePatientTypeChange("hmo")}
                    >
                      {patientTypeData.hmo.label}
                    </button>
                    <button
                      className={`block w-full text-left px-3 py-2 hover:bg-gray-50 ${
                        selectedPatientType === "corporate"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                      onClick={() => handlePatientTypeChange("corporate")}
                    >
                      {patientTypeData.corporate.label}
                    </button>
                    <button
                      className={`block w-full text-left px-3 py-2 hover:bg-gray-50 ${
                        selectedPatientType === "private"
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                      onClick={() => handlePatientTypeChange("private")}
                    >
                      {patientTypeData.private.label}
                    </button>
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
            <h3 className="font-medium">{"Today's Revenue"}</h3>
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
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 text-[12px]">
        {/* Recent Activities */}
        <section className="bg-white backdrop-blur-lg text-[12px] rounded-[20px] border border-gray-200 shadow-lg col-span-4">
          <div className="p-6 text-[12px]">
            <header className="mb-6">
              <h2 className="text-[12px] font-bold text-gray-900">
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
                  let colors;
                  if (activity.status === "completed") {
                    colors = statusColors.completed;
                  } else if (activity.status === "in-progress") {
                    colors = statusColors["in-progress"];
                  } else {
                    colors = statusColors.pending;
                  }
                  return (
                    <article
                      key={activity.id || index}
                      className="flex items-start justify-between group hover:bg-gray-50 transition-colors p-3 rounded-lg"
                    >
                      <div className="flex items-start space-x-4">
                        <span
                          className={`mt-1.5 w-3 h-3 rounded-full ${colors.dot}`}
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
          <nav className="flex space-x-4 mb-6 border-b border-gray-300">
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
                >
                  {tab
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </button>
              )
            )}
          </nav>

          {/* Tab Panels */}
          <section className="bg-white rounded-[20px] border border-gray-200 shadow-md p-6 min-h-[200px]">
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
                          ? "bg-[#14B8A6] text-white"
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

      <section className="bg-white rounded-[20px] border border-gray-200 shadow-md p-6 min-h-[600px] h-full">
        <div className="">
          <LineChart  />
        </div>
      </section>
    </main>
  );
}
