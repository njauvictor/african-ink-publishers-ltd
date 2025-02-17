"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Book, Tablet, Headphones, ShoppingCart } from "lucide-react";

const Books = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const itemsPerPage = 10;
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
    <div className="mb-12 rounded-md max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="mb-4 text-xl font-bold text-primary-dark/80 dark:text-white">
        Search Books
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

         
        </div>
      </div>

      {/* Cards Container */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {paginatedBooks.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500 dark:text-gray-300">
            No books available
          </div>
        ) : (
          paginatedBooks.map((book, index) => (
            <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-4">
              <img
                src={book.image_url}
                alt={book.book_title}
                className="w-auto h-72 object-cover rounded-md"
              />
              <div className="text-start">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate" style={{ width: '200px' }}>
  {book.book_title.length > 20 ? `${book.book_title.slice(0, 20)}...` : book.book_title}
</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{book.author_name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{book.publisher}</p>
              </div>

               {/* Book Price Icon */}
               <div className="flex items-center gap-2 text-sm">
                    <Book className="w-5 h-5 text-blue-600" />
                    <p>Book: <span className="text-primary-dark/70 font-semibold">KES  {book.book_price}</span></p>
                  </div>
                  {/* EBook Price Icon */}
                  <div className="flex items-center gap-2 text-sm ">
                    <Tablet className="w-5 h-5 text-orange-600" />
                    <p>Ebook: <span className="text-primary-dark/70 font-semibold">KES {book.ebook_price}</span></p>
                  </div>
                  {/* AudioBook Price Icon */}
                  <div className="flex items-center gap-2 text-sm">
                    <Headphones className="w-5 h-5 text-yellow-600" />
                    <p>AudioBook: <span className="text-primary-dark/70 font-semibold">KES {book.audio_price}</span></p>
                  </div>

              <div className="flex flex-row justify-start items-start space-x-2 mt-4 text-sm">
                <Link href={`/book/${book.id}`} className="gap-2 px-4 bg-primary-dark/80 text-white p-2 rounded-md flex flex-row hover:bg-primary-light">
                  <AiOutlineEye size={20} /> View
                </Link>

                <button
                    className="gap-2 text-sm px-4 flex flex-row bg-accent-dark/80 text-white p-2 rounded-md  hover:bg-accent-dark/90 transition"
                    aria-label="Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" /> Cart
                  </button>
               
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 items-center mt-6">
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

export default Books;
