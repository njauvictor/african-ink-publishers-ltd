// ViewOrder.js
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../supabase.js";

const ViewOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();
      if (error) console.error("Error fetching order:", error.message);
      setOrder(data);
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold">Order Details</h2>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>User:</strong> {order.user_id}</p>
      <p><strong>Amount:</strong> ${order.amount}</p>
      <p><strong>Status:</strong> {order.status}</p>
    </div>
  );
};

export default ViewOrder;