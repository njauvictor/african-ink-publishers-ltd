"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../supabase.js";

const EditPayment = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_id: "",
    amount: "",
    payment_m: "",
    status: "",
    sale_type: "",
    merchant_n: "",
    checkout_r: "",
    result_code: "",
    result_desc: "",
    mpesa_rece: "",
    transaction_t: "",
    phone_p: "",
    book_id: "",
    order_id: ""
  });

  useEffect(() => {
    const fetchPayment = async () => {
      const { data, error } = await supabase.from("payments").select("*").eq("id", id).single();
      if (error) return console.error("Error fetching payment:", error.message);
      setFormData(data);
    };
    fetchPayment();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("payments").update(formData).eq("id", id);
    if (error) return alert("Error updating payment: " + error.message);
    alert("Payment updated successfully!");
    router.push("/payments");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold">Edit Payment</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block font-semibold capitalize">{key.replace("_", " ")}</label>
            <input 
              type={key === "amount" ? "number" : "text"} 
              name={key} 
              value={formData[key]} 
              onChange={handleChange} 
              className="border p-2 w-full" 
              required 
            />
          </div>
        ))}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-4">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPayment;
