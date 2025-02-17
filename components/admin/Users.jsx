'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye, AiOutlineArrowLeft } from 'react-icons/ai';
import { PlusIcon } from 'lucide-react';

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  useEffect(() => {
    fetch("https://book-store-server-bice.vercel.app/all-users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setAllUsers(data);
        setFilteredUsers(data); // Initialize filtered users
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Error fetching users");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let users = allUsers;

    // Apply search filter
    if (searchQuery) {
      users = users.filter((user) =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(users);
    setCurrentPage(1); // Reset to the first page when search changes
  }, [searchQuery, allUsers]);

  const handleDelete = (id) => {
    fetch(`https://book-store-server-bice.vercel.app/user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setAllUsers(allUsers.filter((user) => user.id !== id));
        alert("User deleted successfully");
      })
      .catch(() => {
        setError("Error deleting user");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Slice the users for pagination
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mb-12 rounded-md ">
      
    <div className='flex justify-between '>

    <h2 className="ml-2 mb-4 text-md font-bold text-primary-dark/80 dark:text-white p-2">
        Manage Users
      </h2>
    <button
                onClick={() => router.back()}
                className="text-sm text-primary-dark hover:text-primary-light p-2 font-semibold rounded-md mb-6 flex items-center gap-2"
              >
                <AiOutlineArrowLeft size={20} /> Back
              </button>
              
              
    </div>

     

      {/* Filter and Search Bars */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex items-center gap-4 w-full md:w-full">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 border border-primary-dark/20 rounded-md dark:bg-gray-800 dark:text-white bg-primary-dark/5 text-sm w-full md:w-64"
          />
          
          <Link href="/dashboard/add-user" passHref>
            <button
              type="button"
              className="flex gap-2 p-3 border border-primary-dark/20 rounded-md dark:bg-gray-800 font-medium text-white bg-primary-dark/80 hover:bg-primary-light text-sm items-center justify-center"
            >
              <PlusIcon /> Add New User
            </button>
          </Link>
        </div>
      </div>

      {/* Make the table scrollable horizontally */}
      <div className="overflow-x-auto mb-6 rounded-lg">
        <div className="shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
            <thead className="bg-primary-dark/80 text-white dark:bg-primary-light">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-start">No.</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Name</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Email</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Phone</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Address</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Role</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Orders</th>                
                <th className="px-4 py-2 text-sm font-medium text-start">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center text-gray-500 dark:text-gray-300">
                    No users available
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{`${user.first_name} ${user.last_name}`}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{user.email}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{user.phone}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{user.role}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{user.address}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{user.orders}</td>
                    
                    <td className="px-4 py-3 flex space-x-2 justify-center items-center">
                      <Link
                        href={`/dashboard/view-user/${user.id}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <AiOutlineEye size={20} />
                      </Link>
                      <Link
                        href={`/dashboard/edit-user/${user.id}`}
                        className="text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300"
                      >
                        <AiOutlineEdit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-accent-dark text-white p-2 rounded-md hover:bg-red-700 transition-all"
                      >
                        <AiOutlineDelete size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 items-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="text-sm bg-primary-dark hover:bg-primary-light text-white p-2 rounded-md disabled:bg-gray-400"
        >
          Prev
        </button>
        <span className="text-primary-light text-sm dark:text-white">
          {`Page ${currentPage} of ${totalPages}`}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="bg-primary-dark hover:bg-primary-light text-white p-2 rounded-md disabled:bg-gray-400 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
