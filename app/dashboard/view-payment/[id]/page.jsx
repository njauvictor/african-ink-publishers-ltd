"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../supabase";

const ViewPayment = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      const { data, error } = await supabase.from("payments").select("*").eq("id", id).single();
      if (error) console.error("Error fetching payment:", error.message);
      setPayment(data);
      setLoading(false);
    };
    fetchPayment();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      {payment ? (
        <div className="grid grid-cols-2 gap-4">
          <p><strong>ID:</strong> {payment.id}</p>
          <p><strong>User ID:</strong> {payment.user_id}</p>
          <p><strong>Amount:</strong> ${payment.amount}</p>
          <p><strong>Payment Method:</strong> {payment.payment_m}</p>
          <p><strong>Status:</strong> {payment.status}</p>
          <p><strong>Sale Type:</strong> {payment.sale_type}</p>
          <p><strong>Merchant:</strong> {payment.merchant_n}</p>
          <p><strong>Checkout Request ID:</strong> {payment.checkout_r}</p>
          <p><strong>Result Code:</strong> {payment.result_code}</p>
          <p><strong>Result Description:</strong> {payment.result_desc}</p>
          <p><strong>MPESA Receipt:</strong> {payment.mpesa_rece}</p>
          <p><strong>Transaction Date:</strong> {new Date(payment.transaction_t).toLocaleString()}</p>
          <p><strong>Phone Number:</strong> {payment.phone_p}</p>
          <p><strong>Book ID:</strong> {payment.book_id}</p>
          <p><strong>Order ID:</strong> {payment.order_id}</p>
          <p><strong>Created At:</strong> {new Date(payment.created_at).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(payment.updated_at).toLocaleString()}</p>
        </div>
      ) : (
        <p>Payment not found.</p>
      )}
    </div>
  );
};

export default ViewPayment;
