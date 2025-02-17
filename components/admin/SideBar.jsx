"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiSupport,
  HiTable,
  HiUser,
  HiViewBoards,
  HiOutlineCloudUpload,
  HiChevronLeft, // Collapse icon for toggling sidebar
} from "react-icons/hi";
import { useAuth } from "@/contexts/AuthProvider";
import MobileDashboard from "./MobileDashboard";

const SideBar = () => {
  const { user, logOut } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      // You might want to add router.push('/') here if you're using Next.js router
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsCollapsed(false); // Reset to expanded on desktop
    }
  };

  // Handle resize event to toggle mobile behavior
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state based on window width
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sticky top-0">
      {/* Sidebar for desktop */}
      <Sidebar
        aria-label="Sidebar"
        className={`mb-12 font-medium md:block w-52 shadow-md transition-all ${
          isCollapsed ? "w-16" : "w-52"
        }`}
      >
        {/* Logo with conditional visibility */}
        <Sidebar.Logo
          href="/"
          img={user?.photoURL || "https://flowbite.com/docs/images/logo.svg"}
          className={`w-9 h-9 rounded-full  gap-2 text-md text-accent-dark ${
            isCollapsed ? "hidden" : ""
          }`}
          imgAlt="Flowbite logo"
        >
          {/* Display user name only when sidebar is expanded */}
          <p className={`text-lg ${isCollapsed ? "hidden" : ""} `}>
            {user?.displayName || "Demo User"}
          </p>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/dashboard" icon={HiChartPie}>
              <p className={` text-primary-dark/90 ${isCollapsed ? "hidden" : ""}`}>
                Dashboard
              </p>
            </Sidebar.Item>
            <Sidebar.Item href="/dashboard/add-book" icon={HiOutlineCloudUpload}>
              <p className={`text-primary-dark/90 ${isCollapsed ? "hidden" : ""}`}>
                Upload Book
              </p>
            </Sidebar.Item>

            <Sidebar.Item href="/dashboard/manage-books" icon={HiInbox}>
              <p className={`text-primary-dark/90 ${isCollapsed ? "hidden" : ""}`}>
                Manage Books
              </p>
            </Sidebar.Item>
            <Sidebar.Item href="/dashboard/users" icon={HiUser}>
              <p className={`text-primary-dark/90 ${isCollapsed ? "hidden" : ""}`}>
                Users
              </p>
            </Sidebar.Item>
            <Sidebar.Item href="/dashboard/products" icon={HiShoppingBag}>
              <p className={`text-primary-dark/90 ${isCollapsed ? "hidden" : ""}`}>
                Products
              </p>
            </Sidebar.Item>
            <Sidebar.Item href="/dashboard/payments" icon={HiShoppingBag}>
              <p className={`text-primary-dark/90 ${isCollapsed ? "hidden" : ""}`}>
                Payments
              </p>
            </Sidebar.Item>

            <Sidebar.Item href="/dashboard/orders" icon={HiShoppingBag}>
              <p className={`text-primary-dark/90 ${isCollapsed ? "hidden" : ""}`}>
                Orders
              </p>
            </Sidebar.Item>

            <Sidebar.Item href="/login" icon={HiArrowSmRight}>
              <p className={`text-primary-dark/90 ${isCollapsed ? "hidden" : ""}`}>
                Sign In
              </p>
            </Sidebar.Item>
            <Sidebar.Item href="/logout" icon={HiTable}>
              <p className={`text-primary-dark/90 ${isCollapsed ? "hidden" : ""}`}>
                Log out
              </p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
         
          </Sidebar.ItemGroup>
        </Sidebar.Items>

        {/* Collapsible Button inside Sidebar */}
        <div
          className="absolute top-4 right-[-2] cursor-pointer z-10 mb-4 ml-2"
          onClick={toggleSidebar}
        >
          <HiChevronLeft
            size={30}
            className={`text-primary-dark/80 hover:text-primary-dark justify-center items-center transition-transform transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </div>
      </Sidebar>

      {/* Sidebar for mobile */}
      <div className="md:hidden">
        <MobileDashboard />
      </div>
    </div>
  );
};

export default SideBar;
