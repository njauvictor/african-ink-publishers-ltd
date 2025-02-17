// OrdersList.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) console.error("Error fetching orders:", error.message);
      setOrders(data || []);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) return alert("Error deleting order: " + error.message);
    setOrders(orders.filter(order => order.id !== id));
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.user_id}</td>
              <td className="p-2">${order.amount}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">
                <button onClick={() => router.push(`/orders/view/${order.id}`)} className="bg-blue-500 text-white px-2 py-1 mr-2">View</button>
                <button onClick={() => router.push(`/orders/edit/${order.id}`)} className="bg-green-500 text-white px-2 py-1 mr-2">Edit</button>
                <button onClick={() => handleDelete(order.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;



