"use client";

import { useState } from "react";
import Table from "@/app/components/ui/Table";
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  MapPin,
} from "lucide-react";
import Button from "@/app/components/ui/Button";

const patients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    phone: "+1 234-567-8901",
    email: "john.doe@email.com",
    address: "123 Main St, City",
    bloodGroup: "O+",
    lastVisit: "2024-01-15",
    status: "Active",
    insurance: "Blue Cross",
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    phone: "+1 234-567-8902",
    email: "jane.smith@email.com",
    address: "456 Oak Ave, City",
    bloodGroup: "A+",
    lastVisit: "2024-01-10",
    status: "Active",
    insurance: "Aetna",
  },
  {
    id: "P003",
    name: "Mike Johnson",
    age: 28,
    gender: "Male",
    phone: "+1 234-567-8903",
    email: "mike.johnson@email.com",
    address: "789 Pine St, City",
    bloodGroup: "B+",
    lastVisit: "2023-12-20",
    status: "Inactive",
    insurance: "Medicare",
  },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const tableHeaders = [
    "Patient ID",
    "Name",
    "Age/Gender",
    "Contact",
    "Blood Group",
    "Last Visit",
    "Status",
    "Actions",
  ];

  const data = [
    [
      "P001",
      "John Doe",
      "28 / M",
      "+2348012345678",
      "O+",
      "2024-12-01",
      "Active",
      "View",
    ],
    [
      "P002",
      "Jane Smith",
      "32 / F",
      "+2348098765432",
      "A-",
      "2024-11-15",
      "Inactive",
      "View",
    ],
    [
      "P003",
      "Alice Johnson",
      "45 / F",
      "+2348123456789",
      "B+",
      "2024-10-22",
      "Active",
      "View",
    ],
    [
      "P004",
      "Michael Brown",
      "51 / M",
      "+2348076543210",
      "AB-",
      "2024-09-30",
      "Inactive",
      "View",
    ],
    [
      "P005",
      "Grace Lee",
      "29 / F",
      "+2348034567890",
      "O-",
      "2024-12-05",
      "Active",
      "View",
    ],
  ];

  return (
    <div className="flex h-screen w-[100%]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Patients</h2>
                  <p className="text-sm text-gray-600">
                    Manage patient records and information
                  </p>
                </div>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  variant="secondary"
                  className="text-[12px]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients by name, ID, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>

              {/* Use your custom Table component */}
              <Table headers={tableHeaders} data={data} />
            </div>
          </div>
        </main>
      </div>

      {/* Add Patient Dialog */}
      {isAddDialogOpen && (
       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
   <div className="bg-white rounded-[15px] shadow-xl  w-[600px] z-50 mx-auto overflow-hidden">
  <div className="p-6 border-b">
    <h3 className="text-lg font-semibold">Register New Patient</h3>
    <p className="text-sm text-gray-600">
      Enter patient information to create a new record
    </p>
  </div>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      setIsAddDialogOpen(false);
    }}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 h-[400px] overflow-y-auto text-[12px]">
      {/* First Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter first name"
          required
        />
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter last name"
          required
        />
      </div>

      {/* Age */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          min={0}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter age"
          required
        />
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter phone number"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter email"
        />
      </div>

      {/* Blood Group */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Blood Group</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        >
          <option value="">Select blood group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>O+</option>
          <option>O-</option>
          <option>AB+</option>
          <option>AB-</option>
        </select>
      </div>

      {/* Insurance */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Insurance</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter insurance provider"
        />
      </div>

      {/* Address */}
      <div className="col-span-1 sm:col-span-2 space-y-2">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
          placeholder="Enter full address"
        />
      </div>
    </div>

    {/* Footer */}
    <div className="flex justify-end gap-3 px-6 py-4 border-t text-[12px]">
      <Button  variant="outline" onClick={() => setIsAddDialogOpen(false)}>
        Cancel
      </Button>
      <Button type="submit" variant="secondary">
        Register Patient
      </Button>
    </div>
  </form>
</div>

  </div>

      )}

      {/* Patient Details Dialog */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Patient Details</h3>
              <p className="text-sm text-gray-600">
                Complete information for {selectedPatient.name}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Patient ID
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPatient.id}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPatient.name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPatient.age} years
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPatient.gender}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPatient.phone}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPatient.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPatient.bloodGroup}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Insurance
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedPatient.insurance}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <p className="text-sm text-gray-600 mt-1 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {selectedPatient.address}
                </p>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-4 py-2 bg-blue-600 text-black rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
