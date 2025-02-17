"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase";

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPayments = async () => {
      const { data, error } = await supabase.from("payments").select("*");
      if (error) console.error("Error fetching payments:", error.message);
      setPayments(data || []);
      setLoading(false);
    };
    fetchPayments();
  }, []);

  if (loading) return <p className="text-center py-4">Loading payments...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[1200px] w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-100 z-10">
                ID
              </th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Payment Method
              </th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Sale Type</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Merchant</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Checkout Ref
              </th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Mpesa Receipt
              </th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">
                Transaction Time
              </th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Book ID</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="border p-3 text-left text-sm font-semibold text-gray-700 sticky right-0 bg-gray-100 z-10">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-gray-50 transition-colors border-b border-gray-200"
              >
                <td className="p-3 text-sm text-gray-700 sticky left-0 bg-white z-10">
                  {payment.id}
                </td>
                <td className="p-3 text-sm text-gray-700">{payment.user_id}</td>
                <td className="p-3 text-sm text-gray-700">${payment.amount}</td>
                <td className="p-3 text-sm text-gray-700">{payment.payment_m}</td>
                <td className="p-3 text-sm text-gray-700">{payment.status}</td>
                <td className="p-3 text-sm text-gray-700">{payment.sale_type}</td>
                <td className="p-3 text-sm text-gray-700">{payment.merchant_n}</td>
                <td className="p-3 text-sm text-gray-700">{payment.checkout_r}</td>
                <td className="p-3 text-sm text-gray-700">{payment.mpesa_rece}</td>
                <td className="p-3 text-sm text-gray-700">
                  {new Date(payment.transaction_t).toLocaleString()}
                </td>
                <td className="p-3 text-sm text-gray-700">{payment.phone_p}</td>
                <td className="p-3 text-sm text-gray-700">{payment.book_id}</td>
                <td className="p-3 text-sm text-gray-700">{payment.order_id}</td>
                <td className="p-3 text-sm text-gray-700 sticky right-0 bg-white z-10">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/payments/view/${payment.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => router.push(`/payments/edit/${payment.id}`)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsList;