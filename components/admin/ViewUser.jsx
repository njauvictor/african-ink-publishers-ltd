"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../supabase.js";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ViewUser = () => {
  const { id } = useParams();
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No user ID provided");
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const { data: user, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", id)
          .single();

        if (userError) throw userError;

        setUserData(user);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchOrders = async () => {
      try {
        const { data: userOrders, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", id);

        if (ordersError) throw ordersError;

        setOrders(userOrders);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchPayments = async () => {
      try {
        const { data: userPayments, error: paymentsError } = await supabase
          .from("payments")
          .select("*")
          .eq("user_id", id);

        if (paymentsError) throw paymentsError;

        setPayments(userPayments);
      } catch (err) {
        setError(err.message);
      }
    };

    Promise.all([fetchUserData(), fetchOrders(), fetchPayments()]).finally(() =>
      setIsLoading(false)
    );
  }, [id]);

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  return (
    <div className="mb-12 p-6 max-w-6xl mx-auto rounded-md bg-white shadow-md dark:bg-gray-800">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-dark/80 dark:text-white">
          User Details
        </h2>
        <button
          onClick={() => router.back()}
          className="text-sm text-primary-dark hover:text-primary-light p-2 rounded-md flex items-center"
        >
          <AiOutlineArrowLeft size={20} /> Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={userData?.user_image || "/default-avatar.png"}
            alt={userData?.first_name}
            className="w-full h-130 object-cover rounded-full shadow-lg"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-primary-dark/80 dark:text-white">
            {userData?.first_name} {userData?.last_name}
          </h3>
          <p><strong>Email:</strong> {userData?.email}</p>
          <p><strong>Phone:</strong> {userData?.phone}</p>
          <p><strong>Role:</strong> {userData?.role}</p>
          <p><strong>Address:</strong> {userData?.address || "N/A"}</p>
          <p><strong>Joined On:</strong> {new Date(userData?.date_joined).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold">Orders</h3>
        {orders.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {orders.map((order) => (
              <li key={order.id} className="border p-2 rounded">
                Order ID: {order.id} - Status: {order.status} - Total: ${order.total}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold">Payments</h3>
        {payments.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {payments.map((payment) => (
              <li key={payment.id} className="border p-2 rounded">
                Payment ID: {payment.id} - Amount: ${payment.amount} - Status: {payment.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewUser;
