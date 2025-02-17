"use client"; // Ensure this component is rendered only on the client side
import { useState, useEffect, useContext } from "react";
import useCartStore from "../../store/cartStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider"; // Import AuthContext

export default function Cart() {
  const { cartItems, removeItem, updateQuantity, clearCart } = useCartStore();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [address, setAddress] = useState("");
  const [currentCheckoutRequestID, setCurrentCheckoutRequestID] = useState(null);
  const router = useRouter();

  // Use AuthContext to get the authenticated user
  const { user } = useContext(AuthContext);

  // Fixed account number (hidden from UI)
  const accountNumber = "Book Purchase from AfricanLink Publishers";

  // Calculate total amount
  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => {
      if (item && item.quantity) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
    const total = subtotal - discount + tax;
    setAmount(total);
  }, [cartItems, discount, tax]);

  // Handle payment initiation
  const handlePayment = async () => {
    if (!phone) {
      alert("Please fill in your phone number.");
      return;
    }

    if (!user) {
      alert("You must be logged in to proceed with payment.");
      router.push("/login"); // Redirect to login page
      return;
    }

    setLoading(true);
    console.log("Initiating payment...");

    try {
      const response = await axios.post("https://mpesa-africanink-ltd-server.vercel.app/stkpush", {
        phone,
        accountNumber, // Use the fixed account number
        amount,
      });

      console.log("Payment initiation response:", response);

      if (response.data.ResponseCode === "0") {
        const checkoutRequestID = response.data.CheckoutRequestID;
        setCurrentCheckoutRequestID(checkoutRequestID);
        alert("Payment initiated successfully. Please complete the payment on your phone.");
        checkPaymentStatus(checkoutRequestID);
      } else {
        alert("Failed to initiate payment.");
        console.error("Error response:", response.data);
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment initiation failed. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Poll payment status
  const checkPaymentStatus = async (checkoutRequestId) => {
    console.log("Polling payment status for CheckoutRequestID:", checkoutRequestId);

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `https://mpesa-africanink-ltd-server.vercel.app//callback?CheckoutRequestID=${checkoutRequestId}`
        );
        console.log("Polling response:", res);

        if (res.data.CheckoutRequestID === checkoutRequestId) {
          if (res.data.success) {
            setPaymentStatus({ status: "success", message: res.data.message });
            clearInterval(interval);
            alert(res.data.message);

            // Clear the cart upon successful payment
            clearCart();

            // Prepare payment data to save to Supabase or your backend
            const paymentData = {
              user_id: user.id, // Use the authenticated user's ID
              amount: amount,
              payment_method: "M-Pesa", // Payment method
              status: "completed", // Payment status
              sale_type: "book purchase", // Sale type (adjust as needed)
              merchant_request_id: res.data.MerchantRequestID, // Merchant Request ID
              checkout_request_id: checkoutRequestId, // Checkout Request ID
              result_code: res.data.ResultCode, // Payment result code
              result_description: res.data.ResultDesc, // Payment result description
              mpesa_receipt_number: res.data.MpesaReceiptNumber, // M-Pesa receipt number
              transaction_date: new Date(res.data.TransactionDate).toISOString(), // Transaction date
              phone_number: phone, // User phone number
              address: address, // User address (optional)
              items: cartItems.map((item) => ({
                book_id: item.bookId,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
              })), // Include cart items in the payment data
            };

            try {
              // Send payment data to your backend API to save in Supabase or database
              await axios.post("https://book-store-server-bice.vercel.app/payment", paymentData);
              console.log("Payment data saved to backend");

              // Redirect to a confirmation page or home page
              router.push("/payment-success"); // Replace with your success page route
            } catch (error) {
              console.error("Failed to save payment data:", error);
            }
          } else if (res.data.message === "Request cancelled by user") {
            setPaymentStatus({ status: "cancelled", message: "Payment was cancelled by the user." });
            clearInterval(interval);
            alert("Payment was cancelled.");
          } else {
            setPaymentStatus({ status: "processing", message: "Payment is still processing. Please wait." });
          }
        } else {
          console.log("Callback received for a previous transaction, skipping...");
        }
      } catch (error) {
        console.error("Error while checking payment status:", error);
        clearInterval(interval);
        alert("Error checking payment status. Please try again.");
      }
    }, 5000); // Poll every 5 seconds
  };

  // Clear cart
  const handleClearCart = () => {
    clearCart();
    setPaymentStatus(null);
    setPhone("");
    setCurrentCheckoutRequestID(null);
  };

  return (
    <div className="bg-accent-dark/2 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg my-4">
          {/* Greet User */}
          {user && (
            <h1 className="text-md font-bold text-primary-dark/80">
              Hello, {user.displayName || "User"}! 
            </h1>
          )}

          {/* Payment Status */}
          {paymentStatus && (
            <div className="mt-8 p-4 bg-accent-dark/2 rounded-xl border border-accent-dark/10">
              <h2 className="text-xl font-semibold text-accent-dark">Payment Status</h2>
              <p className="text-accent-dark">{paymentStatus.message}</p>
            </div>
          )}
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="text-center p-20">
            <FaShoppingCart className="mx-auto text-4xl text-accent-dark mb-4" />
            <p className="text-xl text-primary-dark/70">Your cart is empty!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-primary-light/8 rounded-xl shadow-lg p-4 lg:p-8 border border-primary-dark/10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-primary-dark/80">Cart Items</h2>

                {cartItems.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="px-4 py-2 bg-primary-dark/90 text-white font-medium rounded-lg shadow-md transition-all duration-300 
                              hover:bg-opacity-90 hover:scale-105 active:scale-95 
                              focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-opacity-50"
                  >
                    Clear Cart
                  </button>
                )}
              </div>

              <ul className="space-y-6">
                {cartItems.map((item) => (
                  <li key={item.bookId} className="flex items-center justify-between mt-4 md:mt-8">
                    <div className="flex items-center">
                      <img
                        src={item.image || "/placeholder-book.jpg"}
                        alt={item.title}
                        className="w-20 h-24 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-primary-dark hover:text-accent-dark transition-colors duration-200">{item.title}</h3>
                        <p className="text-primary-dark/80">KES {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => updateQuantity(item.bookId, -1)}
                        className="p-2 bg-primary-dark/10 rounded-full hover:bg-primary-dark/20 transition-colors duration-200"
                      >
                        <FaMinus className="text-sm" />
                      </button>
                      <span className="text-lg font-semibold bg-primary-dark/10 px-3 py-1 rounded-full border border-primary-dark/20">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.bookId, 1)}
                        className="p-2 bg-primary-dark/10 rounded-full hover:bg-primary-dark/20 transition-colors duration-200"
                      >
                        <FaPlus className="text-sm" />
                      </button>
                      <button
                        onClick={() => removeItem(item.bookId)}
                        className="p-2 bg-accent-dark/10 rounded-full hover:bg-accent-dark/20 transition-colors duration-200"
                      >
                        <FaTrash className="text-red-400" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment and Address Section */}
            <div className="bg-accent-dark/2 rounded-xl shadow-lg p-8 border border-primary-dark/10">
              <h2 className="text-2xl font-semibold text-primary-dark mb-6">Order Summary</h2>

              {/* Address Input (Optional) */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary-dark/70 mb-2">
                  Delivery Address (Optional)
                </label>
                <div className="flex items-center bg-primary-dark/5 rounded-lg p-3 border border-primary-dark/10">
                  <FaMapMarkerAlt className="text-accent-dark mr-2" />
                  <input
                    type="text"
                    placeholder="Enter your address (optional)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {/* Discount and Tax */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-primary-dark/70">Subtotal</span>
                  <span className="font-semibold">KES {amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-dark/70">Discount</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-20 text-right border border-primary-dark/20 rounded-lg px-2 py-1"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-dark/70">Tax</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={tax}
                    onChange={(e) => setTax(Number(e.target.value))}
                    className="w-20 text-right border border-primary-dark/20 rounded-lg px-2 py-1"
                  />
                </div>
                <div className="flex justify-between border-t border-primary-dark/20 pt-4">
                  <span className="text-lg font-semibold text-accent-dark">Total</span>
                  <span className="text-lg font-semibold text-accent-dark">KES {amount.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-primary-dark/70">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-primary-dark/20 rounded-lg"
                  />
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full mt-4 py-2 bg-accent-dark text-white font-semibold rounded-lg hover:bg-accent-dark/90 focus:outline-none focus:ring-2 focus:ring-accent-dark"
                  disabled={loading}
                >
                  {loading ? "Processing Payment..." : "Proceed to Payment"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
