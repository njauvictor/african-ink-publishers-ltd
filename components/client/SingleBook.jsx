"use client";

import { FaBook } from 'react-icons/fa'; // Book icon for physical book
import { BookOpen, Headphones } from 'lucide-react'; // Icons for Ebook and Audiobook
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SingleBookContent = ({ book, isLoading, error }) => {
  const router = useRouter();

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <FaBook className="animate-pulse text-blue-500" size={48} />
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center p-4">
      Error: {error}
    </div>
  );

  if (!book) return <div className="text-center text-lg font-semibold text-gray-500">Book not found</div>;

  const handleReadClick = () => {
    router.push(`/reader/${book.id}`);
  };

  const handleBuyClick = () => {
    const cartItem = {
      bookId: book.id,
      title: book.book_title,
      saleType: 'physical', // Adjust according to sale type
      price: book.book_price,
      image: book.image_url,
      quantity: 1,
    };

    const handleListen = () => {
      // Navigate to the audio player page with the book ID
      router.push(`/audiobook/${bookId}`);
    };



    // Save cartItem to local storage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = currentCart.find(item => item.bookId === book.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));

    // Redirect to the cart page
    router.push('/cart');
  };

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 bg-primary-dark/5">
      <div className="max-w-7xl mx-auto rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4 md:p-8">
          {/* Book Title and Author */}
          <h1 className="text-4xl font-extrabold text-primary-dark/80 dark:text-gray-100 mb-2">{book.book_title}</h1>
          <p className="text-lg text-primary-dark/80 dark:text-gray-300 mb-6">by {book.author_name}</p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Book Image */}
            <div className="flex justify-center">
              <img 
                src={book.image_url} 
                alt={book.book_title}
                className="w-full h-92 rounded-lg shadow-xl object-fit"
              />
            </div>

            {/* Book Details and Action Buttons */}
            <div className="space-y-4">
              <div className="pt-4 md:mt-4 border-t">
                <h3 className="font-bold text-2xl mb-4 text-primary-dark/90 dark:text-gray-200">Book Details:</h3>
                <div className="grid grid-cols-2 gap-2 text-base text-gray-700 dark:text-gray-300">
                  <span className="font-medium">ISBN:</span>
                  <span>{book.isbn}</span>
                  <span className="font-medium">Published:</span>
                  <span>{new Date(book.date_published).toLocaleDateString()}</span>
                  <span className="font-medium">Edition:</span>
                  <span>{book.book_edition}</span>
                  <span className="font-medium">Publisher:</span>
                  <span>{book.publisher}</span>
                </div>
              </div>

              {/* Ebook, Audiobook, and Physical Book Buttons */}
              <div className="space-y-4 md:pt-8">
                <button
                  onClick={handleReadClick}
                  className="w-full bg-primary-dark text-white py-3 rounded-lg flex items-center justify-center hover:bg-primary-dark/80 transition"
                >
                  <BookOpen className="mr-2" />
                  Read Ebook
                </button>

             <Link href={`/audio/${book.id}`}>
             <button              
                 className="w-full bg-primary-light text-white py-3 rounded-lg flex items-center justify-center hover:bg-primary-light/80 transition my-4">
                  <Headphones className="mr-2" />
                  Listen to Audiobook
                </button>
             </Link>

                <button
                  onClick={handleBuyClick}
                  className="w-full bg-accent-dark text-white py-3 rounded-lg flex items-center justify-center hover:bg-accent-dark/80 transition"
                >
                  <FaBook className="mr-2" />
                  Buy Physical Book (${book.book_price})
                </button>
              </div>

              {/* Book Description */}
              <div className="mt-12 border-t pt-8">
                <p className="text-primary-dark/70 text-sm text-justify mb-8 h-auto">
                  <span className="font-bold text-2xl text-primary-dark/80">Book Description:</span> <br />
                  {book.description}
                </p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {book.preview_url && (
            <div className="mt-12">
              <h3 className="font-bold text-2xl text-gray-700 dark:text-gray-300 mb-4">Book Preview:</h3>
              <div className="grid grid-cols-2 gap-6">
                {book.preview_url.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Preview page ${index + 1}`} 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="mt-12">
            <h3 className="font-bold text-2xl text-gray-700 dark:text-gray-300 mb-4">Reviews:</h3>
            {book.reviews && book.reviews.length > 0 ? (
              <div className="space-y-4">
                {book.reviews.map((review, index) => (
                  <div key={index} className="border-t pt-4">
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{review.reviewer_name}</p>
                    <p className="text-gray-600 dark:text-gray-400">{review.review_text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookContent;