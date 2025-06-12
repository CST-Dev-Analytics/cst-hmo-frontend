"use client";

import { useState } from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaChevronRight,
  FaPlus,
  FaHeartbeat,
  FaHeart,
  FaPills,
  FaClipboardList,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Button from "@/app/components/ui/Button";
const todayStats = [
  {
    title: "Today's Appointments",
    value: "8",
    change: "+2 from yesterday",
    icon: FaCalendarAlt,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    trend: "up",
  },
  {
    title: "Patients Seen",
    value: "5",
    change: "3 remaining",
    icon: FaUsers,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    trend: "neutral",
  },
  {
    title: "Prescriptions Written",
    value: "12",
    change: "+4 from yesterday",
    icon: FaFileAlt,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    trend: "up",
  },
  {
    title: "Pending Reviews",
    value: "3",
    change: "2 urgent",
    icon: FaExclamationCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    trend: "attention",
  },
];

const upcomingAppointments = [
  {
    id: 1,
    patient: "John Doe",
    time: "10:00 AM",
    type: "Follow-up",
    status: "confirmed",
    duration: "30 min",
    condition: "Hypertension",
    priority: "normal",
  },
  {
    id: 2,
    patient: "Sarah Wilson",
    time: "11:30 AM",
    type: "Consultation",
    status: "confirmed",
    duration: "45 min",
    condition: "Diabetes",
    priority: "high",
  },
  {
    id: 3,
    patient: "Mike Johnson",
    time: "02:00 PM",
    type: "Check-up",
    status: "pending",
    duration: "30 min",
    condition: "Annual Physical",
    priority: "normal",
  },
];

const recentPatients = [
  {
    id: 1,
    name: "Emma Davis",
    lastVisit: "2024-01-14",
    condition: "Hypertension",
    status: "stable",
    vitals: { bp: "120/80", hr: "72" },
  },
  {
    id: 2,
    name: "Robert Brown",
    lastVisit: "2024-01-13",
    condition: "Diabetes",
    status: "monitoring",
    vitals: { glucose: "140", hr: "68" },
  },
  {
    id: 3,
    name: "Lisa Garcia",
    lastVisit: "2024-01-12",
    condition: "Arthritis",
    status: "improving",
    vitals: { pain: "3/10", mobility: "good" },
  },
];

const quickActions = [
  {
    title: "New Prescription",
    icon: FaPills,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
  },
  {
    title: "Schedule Appointment",
    icon: FaCalendarAlt,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    hoverColor: "hover:bg-emerald-100",
  },
  {
    title: "Patient Records",
    icon: FaClipboardList,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100",
  },
  {
    title: "Complete Visit",
    icon: FaCheckCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    hoverColor: "hover:bg-amber-100",
  },
  {
    title: "New Patient",
    icon: FaUserPlus,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    hoverColor: "hover:bg-rose-100",
  },
  {
    title: "Lab Results",
    icon: FaHeartbeat,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    hoverColor: "hover:bg-indigo-100",
  },
];

export default function DoctorDashboard() {
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);

  return (
    <div className="min-h-screen ">
      <div className="">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="border-0 shadow-lg bg-white  hover:shadow-md transition-all duration-300 rounded-xl"
              >
                <div className="p-6">
                  {/* Top Row: Icon + Title on left, Value on right */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                        <Icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <h3 className="font-medium text-[14px] text-slate-900">
                        {stat.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-[16px] font-bold text-slate-900">
                        {stat.value}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Change indicator */}
                  <div>
                    <p
                      className={`text-[12px] ${
                        stat.trend === "up"
                          ? "text-emerald-600"
                          : stat.trend === "attention"
                          ? "text-amber-600"
                          : "text-slate-500"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 h-[600px]">
            <div className="border-0 shadow-sm bg-white rounded-[15px]">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <FaCalendarAlt className="h-5 w-5  text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-[14px] font-semibold text-slate-900">
                        Todays Schedule
                      </h2>
                      <p className="text-[12px] text-slate-600">
                        Your upcoming appointments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-emerald-500 hover:text-emerald-700 cursor-pointer text-[12px] font-medium">
                    View all <FaChevronRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex text-[12px] items-center justify-between p-4 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-200 border border-slate-100/50"
                  >
                    <div className="flex text-[12px] items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`p-3 text-[10px] rounded-xl ${
                            appointment.status === "confirmed"
                              ? " text-emerald-600"
                              : " text-amber-600"
                          }`}
                        >
                          <FaClock className="h-3 w-3" />
                        </div>
                        {appointment.priority === "high" && (
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold text-slate-900">
                            {appointment.patient}
                          </p>
                          {appointment.priority === "high" && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                              High Priority
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-slate-600 mb-1">
                          {appointment.type} • {appointment.duration}
                        </p>
                        <p className="text-xs text-slate-500">
                          {appointment.condition}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[14px] font-medium text-slate-900">
                        {appointment.time}
                      </span>
                      {appointment.status === "pending" && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-medium border border-amber-200 text-amber-600 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex justify-end text-[12px]">
                  <Button title="Add Appointment" variant="secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Patients */}

          <div className="h-[600px]">
            <div className="border-0 shadow-sm bg-white rounded-[15px]">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <FaHeart className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-[14px] font-semibold text-slate-900">
                        Recent Patients
                      </h2>
                      <p className="text-[12px] text-slate-600">
                        Latest patient visits
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-emerald-600 hover:text-emerald-700 cursor-pointer text-[12px] font-medium">
                    View all <FaChevronRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4 h-[410px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                {recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-200 border border-slate-100/50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                       
                        <div>
                          <p className="font-semibold text-[14px] text-slate-900">
                            {patient.name}
                          </p>
                          <p className="text-[12px] text-slate-600">
                            {patient.condition}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-0.5 text-[12px] font-medium rounded-full ${
                          patient.status === "stable"
                            ? "text-emerald-600 border border-emerald-200 bg-emerald-50"
                            : patient.status === "monitoring"
                            ? "text-amber-600 border border-amber-200 bg-amber-50"
                            : "text-blue-600 border border-blue-200 bg-blue-50"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[12px] text-slate-500">
                      <span>
                        {new Date(patient.lastVisit).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <div className="flex space-x-2">
                        {Object.entries(patient.vitals).map(([key, value]) => (
                          <span
                            key={key}
                            className="bg-slate-100 px-2 py-1 rounded"
                          >
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-full mt-6 border border-slate-200 hover:bg-slate-50 py-2.5 px-4 rounded-lg cursor-pointer flex items-center justify-center font-medium transition-all duration-200 text-[14px]">
                  <FaPlus className="mr-2 h-3 w-3 text-emerald-600" />
                  New Patient
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Quick Actions */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          className={`transition-all duration-300 ${
            quickActionsOpen ? "mb-4" : ""
          }`}
        >
          {quickActionsOpen && (
            <div className="bg-white  rounded-2xl shadow-xl border border-slate-200/60 p-4 mb-4 grid grid-cols-2 gap-3 w-80">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <div
                    key={action.title}
                    className={`h-20 flex flex-col items-center justify-center space-y-2 ${action.hoverColor} transition-all duration-200 rounded-xl cursor-pointer`}
                  >
                    <div className={`p-2 rounded-lg ${action.bgColor}`}>
                      <Icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <span className="text-xs font-medium text-slate-700">
                      {action.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          onClick={() => setQuickActionsOpen(!quickActionsOpen)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 border-0 flex items-center justify-center cursor-pointer"
        >
          {quickActionsOpen ? (
            <FaTimes className="h-6 w-6 text-white" />
          ) : (
            <FaBars className="h-6 w-6 text-white" />
          )}
        </div>
      </div>
    </div>
  );
}
