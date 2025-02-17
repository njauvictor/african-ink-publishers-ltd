// EditOrder.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../supabase.js";

const EditOrder = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_id: "",
    amount: "",
    status: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();
      if (error) return console.error("Error fetching order:", error.message);
      setFormData(data);
    };
    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("orders").update(formData).eq("id", id);
    if (error) return alert("Error updating order: " + error.message);
    alert("Order updated successfully!");
    router.push("/orders");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold">Edit Order</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} className="border p-2 w-full" required />
        <label>Amount:</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="border p-2 w-full" required />
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange} className="border p-2 w-full" required>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">Save Changes</button>
      </form>
    </div>
  );
};

export default EditOrder;
