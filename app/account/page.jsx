"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart, Book, Headphones, Settings } from "lucide-react";

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const user = {
    id: "12345",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    phone: "+254712345678",
    role: "Customer",
    created_at: "2024-01-10",
    updated_at: "2024-02-01",
    user_image: "/avatar.png", // Change this to the user's image
    address: "Nairobi, Kenya",
  };

  const tabs = [
    { name: "Orders", icon: <ShoppingCart size={18} />, key: "orders" },
    { name: "Books", icon: <Book size={18} />, key: "books" },
    { name: "eBooks", icon: <Book size={18} />, key: "ebooks" },
    { name: "Audiobooks", icon: <Headphones size={18} />, key: "audiobooks" },
    { name: "Settings", icon: <Settings size={18} />, key: "settings" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Card */}
      <Card className="p-6 shadow-lg flex items-center space-x-6 bg-white dark:bg-gray-900">
        <img
          src={user.user_image}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-4 border-gray-300"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Joined: {user.created_at}
          </p>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="mt-6 flex space-x-4">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "outline"}
            className="flex items-center space-x-2"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </Button>
        ))}
      </div>

      {/* Content Section */}
      <Card className="mt-6 p-6 shadow-md bg-white dark:bg-gray-800">
        <CardContent>
          {activeTab === "orders" && (
            <div>
              <h3 className="text-lg font-semibold">Your Orders</h3>
              <p className="text-gray-500">No recent orders found.</p>
            </div>
          )}
          {activeTab === "books" && (
            <div>
              <h3 className="text-lg font-semibold">Your Books</h3>
              <p className="text-gray-500">No books purchased yet.</p>
            </div>
          )}
          {activeTab === "ebooks" && (
            <div>
              <h3 className="text-lg font-semibold">Your eBooks</h3>
              <p className="text-gray-500">No eBooks in your library.</p>
            </div>
          )}
          {activeTab === "audiobooks" && (
            <div>
              <h3 className="text-lg font-semibold">Your Audiobooks</h3>
              <p className="text-gray-500">No audiobooks found.</p>
            </div>
          )}
          {activeTab === "settings" && (
            <div>
              <h3 className="text-lg font-semibold">Settings</h3>
              <p className="text-gray-500">Update your profile and preferences.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAccount;
