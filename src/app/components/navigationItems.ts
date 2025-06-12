// components/navigation/navigationItems.ts

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import HotelIcon from "@mui/icons-material/Hotel";
// import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicationIcon from "@mui/icons-material/Medication";
import ShieldIcon from "@mui/icons-material/Shield";
import Inventory2Icon from "@mui/icons-material/Inventory2";

const navigationItems: Record<string, { label: string; href: string; icon: any }[]> = {
  admin: [
    { label: "Dashboard", href: "/admin", icon: DashboardIcon },
    { label: "Patients", href: "/admin/patient-management", icon: PeopleIcon },
    { label: "Appointments", href: "/admin/appointments", icon: CalendarMonthIcon },
    { label: "Doctors", href: "/admin/doctors", icon: LocalHospitalIcon },
    { label: "Prescriptions", href: "/admin/prescriptions", icon: MedicationIcon },
    { label: "Billing", href: "/admin/billing", icon: AttachMoneyIcon },
    { label: "Insurance", href: "/admin/insurance", icon: ShieldIcon },
    { label: "In-Patient", href: "/admin/inpatient", icon: HotelIcon },
    { label: "Pharmacy", href: "/admin/pharmacy", icon: LocalPharmacyIcon },
    { label: "Departments", href: "/admin/departments", icon: DescriptionIcon },
    { label: "Reports", href: "/admin/reports", icon: DescriptionIcon },
  ],
  doctor: [
    { label: "Dashboard", href: "/doctor/dashboard", icon: DashboardIcon },
    { label: "My Patients", href: "/doctor/patients", icon: PeopleIcon },
    { label: "Appointments", href: "/doctor/appointments", icon: CalendarMonthIcon },
    { label: "Prescriptions", href: "/doctor/prescriptions", icon: MedicationIcon },
  ],
  patient: [
    { label: "Dashboard", href: "/patient/dashboard", icon: DashboardIcon },
    { label: "Appointments", href: "/patient/appointments", icon: CalendarMonthIcon },
    { label: "Prescriptions", href: "/patient/prescriptions", icon: MedicationIcon },
    { label: "Billing", href: "/patient/billing", icon: AttachMoneyIcon },
    { label: "Insurance", href: "/patient/insurance", icon: ShieldIcon },
  ],
  nurse: [
    { label: "Dashboard", href: "/nurse/dashboard", icon: DashboardIcon },
    { label: "Patients", href: "/nurse/patients", icon: PeopleIcon },
    { label: "In-Patient", href: "/nurse/inpatient", icon: HotelIcon },
    { label: "Prescriptions", href: "/nurse/prescriptions", icon: MedicationIcon },
  ],
  pharmacist: [
    { label: "Dashboard", href: "/pharmacist/dashboard", icon: DashboardIcon },
    { label: "Pharmacy", href: "/pharmacist/pharmacy", icon: LocalPharmacyIcon },
    { label: "Prescriptions", href: "/pharmacist/prescriptions", icon: MedicationIcon },
    { label: "Inventory", href: "/pharmacist/inventory", icon: Inventory2Icon },
  ],
};

export default navigationItems;
