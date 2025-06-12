"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaHospital,
  FaUserMd,
  FaIdCard,
} from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";

// Dummy user data
const dummyUsers = [
  {
    email: "admin@hospital.com",
    password: "admin123",
    name: "Sarah Johnson",
    employeeId: "ADM001",
    role: "admin",
  },
  {
    email: "doctor@hospital.com",
    password: "doctor123",
    name: "Dr. Michael Chen",
    employeeId: "DOC007",
    role: "doctor",
  },
  {
    email: "nurse@hospital.com",
    password: "nurse123",
    name: "Emily Rodriguez",
    employeeId: "NUR042",
    role: "nurse",
  },
  {
    email: "staff@hospital.com",
    password: "staff123",
    name: "James Wilson",
    employeeId: "STF125",
    role: "staff",
  },
  {
    email: "cardiologist@hospital.com",
    password: "cardio123",
    name: "Dr. Lisa Park",
    employeeId: "DOC056",
    role: "doctor",
    specialty: "Cardiology",
  },
  {
    email: "pediatrician@hospital.com",
    password: "peds123",
    name: "Dr. Robert Kim",
    employeeId: "DOC078",
    role: "doctor",
    specialty: "Pediatrics",
  },
];

const AuthForm = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    employeeId: "",
    role: "doctor",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Full name is required";
      }
      if (!formData.employeeId) {
        newErrors.employeeId = "Employee ID is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (validateForm()) {
      if (isLogin) {
        // Login logic
        const user = dummyUsers.find(
          (u) => u.email === formData.email && u.password === formData.password
        );

        if (user) {
          alert(`Login successful! Welcome ${user.name} (${user.role})`);
          // Store user data in localStorage
          localStorage.setItem("userRole", user.role);
          localStorage.setItem("userName", user.name);

          // Redirect based on role
          switch (user.role.toLowerCase()) {
            case "admin":
              router.push("/admin");
              break;
            case "doctor":
              router.push("/doctor");
              break;
            case "nurse":
              router.push("/nurse");
              break;
            case "staff":
              router.push("/staff");
              break;
            default:
              router.push("/dashboard");
              break;
          }
        } else {
          setAuthError("Invalid email or password");
        }
      } else {
        // Registration logic
        const emailExists = dummyUsers.some((u) => u.email === formData.email);
        if (emailExists) {
          setAuthError("Email already registered");
          return;
        }

        const newUser = {
          ...formData,
          employeeId:
            formData.employeeId ||
            `EMP${Math.floor(1000 + Math.random() * 9000)}`,
        };

        console.log("Registering new user:", newUser);
        alert(`Registration successful! Welcome ${newUser.name}`);
        dummyUsers.push(newUser);

        setIsLogin(true); // switch to login view
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Clear auth error when typing
    if (authError) {
      setAuthError("");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setAuthError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-blue-600 p-6 text-white text-center">
            <div className="flex justify-center mb-3">
              <MdHealthAndSafety className="text-4xl" />
            </div>
            <h1 className="text-2xl font-bold">Hospital Management System</h1>
            <p className="mt-1 opacity-90">
              {isLogin
                ? "Sign in to access your dashboard"
                : "Create a new account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {authError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {authError}
              </div>
            )}

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-2 rounded-lg border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-2 rounded-lg border ${
                        errors.employeeId ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="EMP12345"
                    />
                  </div>
                  {errors.employeeId && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.employeeId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserMd className="text-gray-400" />
                    </div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="admin">Administrator</option>
                      <option value="staff">Support Staff</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-2 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="user@hospital.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 w-full px-4 py-2 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <FaHospital className="mr-2" />
                {isLogin ? "Sign In" : "Register"}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={toggleForm}
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          <p>
            © {new Date().getFullYear()} Hospital Management System. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthForm;
