"use client"; 
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";

const ViewBook = ({ book, isLoading, error }) => {
  const router = useRouter();

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="spinner"></div> {/* You can replace with your spinner component */}
      </div>
    );
  }

  // Show error message if something went wrong during fetch
  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  return (
    <div className="mb-12 p-6 max-w-6xl mx-auto rounded-md bg-white shadow-md dark:bg-gray-800">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-dark/80 dark:text-white">
          View Book Details
        </h2>
        <button
          onClick={() => router.back()}
          className="text-sm text-primary-dark hover:text-primary-light p-2 rounded-md mb-6 flex items-center"
        >
          <AiOutlineArrowLeft size={20} /> Back
        </button>
      </div>

      {/* Main content layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Book Image */}
        <div className="flex justify-center">
          <img
            src={book.image_url}
            alt={book.book_title}
            className="w-full  h-130 object-cover rounded-md shadow-lg"
          />
        </div>

        {/* Book Details */}
        <div className="space-y-4">
          <h3 className="text-3xl font-bold text-primary-dark/80 dark:text-white">
            {book.book_title}
          </h3>
          <div className="h-1 bg-primary-light/60 w-4/5"></div>
          <div className="flex gap-4">
                <p className="text-md text-gray-700 dark:text-gray-300">
                    <strong>Author:</strong> {book.author_name}
                </p>
                <p className="text-md text-gray-700 dark:text-gray-300">
                    <strong>Category:</strong> {book.category}
                </p>
          </div>
          <p className="text-md text-gray-700 dark:text-gray-300">
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <div className="flex gap-4"> <p className="text-md text-gray-700 dark:text-gray-300">
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p className="text-md text-gray-700 dark:text-gray-300">
            <strong>Serial Number:</strong> {book.serial_number}
          </p>
          </div>
          <p className="text-md text-gray-700 dark:text-gray-300">
            <strong>Edition:</strong> {book.book_edition}
          </p>
          <p className="text-md text-gray-700 dark:text-gray-300">
            <strong>Tag:</strong> {book.tag}
          </p>
          <div className="flex gap-4">
          <p className="text-md text-gray-700 dark:text-gray-300">
            <strong>Price:</strong> ${book.book_price}
          </p>
          <p className="text-md text-gray-700 dark:text-gray-300">
            <strong>EBook Price:</strong> ${book.ebook_price}
          </p>
          <p className="text-md text-gray-700 dark:text-gray-300">
            <strong>Audio Price:</strong> ${book.audio_price}
          </p>
          </div>

          {/* Book Published Date */}
          <p className="text-md text-gray-700 dark:text-gray-300">
            <strong>Published On:</strong> {new Date(book.date_published).toLocaleDateString()}
          </p>

          {/* Preview Link */}
          {book.preview_url && (
            <div>
              <a
                href={book.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-primary-dark hover:text-primary-light text-lg font-semibold"
              >
                <strong>Preview Book</strong>
              </a>
            </div>
          )}

          {/* Description */}
          <div className="text-base text-gray-700 dark:text-gray-400 mt-4">
            <strong>Description:</strong>
            <p>{book.description}</p>
          </div>

          {/* Download Links for eBook, PDF, and Audio */}
          <div className="flex gap-4 mt-6">
            {book.ebook_url && (
              <a
                href={book.ebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary-light"
              >
                Download eBook
              </a>
            )}
            {book.pdf_url && (
              <a
                href={book.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary-light"
              >
                Download PDF
              </a>
            )}
            {book.audio_url && (
              <a
                href={book.audio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary-light"
              >
                Download Audio
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
