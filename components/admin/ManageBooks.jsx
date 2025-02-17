"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { PlusIcon } from "lucide-react";

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  useEffect(() => {
    fetch("https://book-store-server-bice.vercel.app/all-books")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        setAllBooks(data);
        setFilteredBooks(data); // Initialize filtered books
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setError("Error fetching books");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let books = allBooks;

    // Apply search filter
    if (searchQuery) {
      books = books.filter((book) =>
        book.book_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter) {
      books = books.filter((book) => book.category === categoryFilter);
    }

    setFilteredBooks(books);
    setCurrentPage(1); // Reset to the first page when filters are changed
  }, [searchQuery, categoryFilter, allBooks]);

  const handleDelete = (id) => {
    fetch(`https://book-store-server-bice.vercel.app/book/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setAllBooks(allBooks.filter((book) => book.id !== id));
        alert("Book deleted successfully");
      })
      .catch(() => {
        setError("Error deleting book");
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

  // Slice the books for pagination
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mb-12 rounded-md">
      <h2 className="mb-4 text-md font-bold text-primary-dark/80 dark:text-white">
        Manage books inventory
      </h2>

      {/* Filter and Search Bars */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex items-center gap-4 w-full md:w-full">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 border border-primary-dark/20 rounded-md dark:bg-gray-800 dark:text-white bg-primary-dark/5 text-sm w-full md:w-64"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-3 border border-primary-dark/20 rounded-md dark:bg-gray-800 text-sm dark:text-white bg-primary-dark/5 w-full md:w-64"
          >
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Academic Text Book</option>
            <option value="Science Fiction">Academic Set Book</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Biography">Biography</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Cookbook">Cookbook</option>
          </select>

          <Link href="/dashboard/add-book" passHref>
            <button
              type="button"
              className="flex gap-2 p-3 border border-primary-dark/20 rounded-md dark:bg-gray-800 font-medium text-white bg-primary-dark/80 hover:bg-primary-light text-sm items-center justify-center"
            >
             <PlusIcon /> Add New Book 
            </button>
          </Link>
        </div>
      </div>

      {/* Make the table scrollable horizontally */}
      <div className="overflow-x-auto mb-6 rounded-lg">
        <div className="shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-auto">
            <thead className="bg-primary-dark/80 text-white dark:bg-primary-light ">
              <tr>
                <th className="px-4 py-2 text-sm font-medium text-start">No.</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Cover</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Book Title</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Author</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Category</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Book Price</th>
                <th className="px-4 py-2 text-sm font-medium text-start">EBook Price</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Audio Price</th>
                <th className="px-4 py-2 text-sm font-medium text-start">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {paginatedBooks.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-4 text-center text-gray-500 dark:text-gray-300">
                    No books available
                  </td>
                </tr>
              ) : (
                paginatedBooks.map((book, index) => (
                  <tr key={book.id}>
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={book.image_url}
                        alt={book.book_title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-2 py-2 text-gray-900 dark:text-white text-base ">{book.book_title}</td>
                    <td className="px-2 py-2 text-gray-900 dark:text-white text-base ">{book.author_name}</td>
                    <td className="px-2 py-2 text-gray-900 dark:text-white text-base ">{book.category}</td>
                    <td className="px-2 py-2 text-gray-900 dark:text-white text-base ">${book.book_price}</td>
                    <td className="px-2 py-2 text-gray-900 dark:text-white text-base ">${book.ebook_price}</td>
                    <td className="px-2 py-2 text-gray-900 dark:text-white text-base">${book.audio_price}</td>
                    <td className="px-2 py-2 text-gray-900 dark:text-white flex space-x-2 justify-center items-center mt-2">
                      <Link
                        href={`/dashboard/view-book/${book.id}`}
                        className="mt-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 justify-center items-center"
                      >
                        <AiOutlineEye size={20} />
                      </Link>
                      <Link
                        href={`/dashboard/edit-book/${book.id}`}
                        className="mt-1text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300 justify-center items-center"
                      >
                        <AiOutlineEdit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="bg-accent-dark text-white p-2 rounded-md hover:bg-red-700 transition-all justify-center items-center"
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

export default ManageBooks;
