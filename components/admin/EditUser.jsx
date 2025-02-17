"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { supabase } from "../../supabase.js";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EditUser = () => {
  const { id } = useParams();
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    address: "",  
    user_image: null,
  });

  const [files, setFiles] = useState({
    user_image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchUserData = async () => {
      try {
        const { data: user, error } = await supabase
          .from("users")
          .select("*, orders(*), payments(*)")
          .eq("id", id)
          .single();

        if (error) throw error;

        setUserData(user);
        setOrders(user.orders || []);
        setPayments(user.payments || []);
        setFormData({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          address: user.address,
          notes: user.notes,
          user_image: user.user_image,
        });
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: newFiles } = e.target;
    const file = newFiles[0];
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [name]: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        address: formData.address,
        notes: formData.notes,
        user_image: userData.user_image,
      };

      // Handle profile picture file upload
      if (files.user_image) {
        const imageData = await uploadFile(files.user_image, "user_image");
        updatedData.user_image = imageData.url;
      }

      const { error } = await supabase
        .from("users")
        .update(updatedData)
        .eq("id", id);

      if (error) throw error;

      alert("User updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      alert(error.message || "User update failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        setIsLoading(true);
        const { error } = await supabase
          .from("users")
          .delete()
          .eq("id", id);

        if (error) throw new Error(error.message);

        alert("User deleted successfully!");
        router.push("/dashboard");
      } catch (error) {
        alert(error.message || "User deletion failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="max-w-screen-lg mx-auto p-8 bg-white shadow-lg rounded-xl border-t-4 border-primary-dark/80">
      <div className='flex justify-between mb-4'>
        <h2 className="text-xl font-bold text-primary-dark/90 dark:text-white">Edit User</h2>
        <button
          onClick={() => router.back()}
          className="text-sm text-primary-dark hover:text-primary-light p-2 font-semibold rounded-md mb-6 flex items-center gap-2"
        >
          <AiOutlineArrowLeft size={20} /> Back
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name and Last Name */}
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <label className="block text-primary-dark/90">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block text-primary-dark/90">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 border rounded"
            />
          </div>
        </div>

        {/* Email, Phone, and Address */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-primary-dark/90">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-2 w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block text-primary-dark/90">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-2 w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block text-primary-dark/90">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-2 w-full p-3 border rounded"
            />
          </div>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-primary-dark/90">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="mt-2 w-full p-3 border rounded"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className="mt-8">
        <h3 className="text-lg font-semibold">Orders</h3>
        <ul>
          {orders.map(order => (
            <li key={order.id}>{order.id} - {order.total_amount}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Payments</h3>
        <ul>
          {payments.map(payment => (
            <li key={payment.id}>{payment.status} - {payment.amount}</li>
          ))}
        </ul>
      </div>     

        {/* User Image Upload */}
        <div>
          <label className="block text-primary-dark/90">Profile Picture</label>
          <input
            type="file"
            name="user_image"
            onChange={handleFileChange}
            className="mt-2 w-full p-3 border rounded"
          />
          {formData.user_image && (
            <div className="mt-4 flex items-center">
              <img
                src={formData.user_image}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full"
              />
              <button
                onClick={() => handleDeleteFile("user_image")}
                className="ml-2 text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Submit buttons */}
        <div className="flex gap-4">
          <div className="mt-6">
            <button
              type="submit"
              className="bg-primary-dark text-white py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete User"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;