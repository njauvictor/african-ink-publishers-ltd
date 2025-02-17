"use client";

import { useState } from "react";
import PropTypes from "prop-types";

function UserForm({ initialData, onSubmit, isLoading }) {
  const [formData, setFormData] = useState(
    initialData || {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      role: "user",
    }
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.role) newErrors.role = "Role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-12 rounded-xl shadow-lg border border-gray-100 space-y-8"
    >
      <h2 className="text-3xl font-semibold text-center text-primary-dark/80">User Information</h2>
      
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            className={`block w-full px-4 py-3 mt-1 rounded-md shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.first_name ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            required
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            className={`block w-full px-4 py-3 mt-1 rounded-md shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.last_name ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            required
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
          )}
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`block w-full px-4 py-3 mt-1 rounded-md shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className={`block w-full px-4 py-3 mt-1 rounded-md shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        </div>

        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className={`block w-full px-4 py-3 mt-1 rounded-md shadow-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="super_admin">Super Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex w-1/2">
        <button
          type="submit"
          className={`w-1/2 py-3 text-white font-medium rounded-md transition duration-200 ease-in-out ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary-dark/90 hover:bg-primary-light/90 focus:ring-4 focus:ring-accent-dark/90"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex justify-center items-center space-x-2">
              <span className="loader border-2 border-t-2 border-white rounded-full w-5 h-5 animate-spin"></span>
              <span>Saving...</span>
            </span>
          ) : (
            "Save User"
          )}
        </button>

        <button
  type="button"
  className="w-1/2 py-3 ml-4 bg-accent-dark/80 text-gray-50 font-medium rounded-md hover:bg-accent-dark transition duration-200 ease-in-out"
  onClick={() => router.push('/dashboard/users')} // Redirects to /dashboard/users
>
  Cancel
</button>

      </div>
    </form>
  );
}

UserForm.propTypes = {
  initialData: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    role: PropTypes.string, // Add role as part of initialData
  }),
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

UserForm.defaultProps = {
  initialData: null,
  isLoading: false,
};

export default UserForm;
