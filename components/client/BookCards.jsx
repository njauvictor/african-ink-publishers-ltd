import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { ShoppingCart, Heart, Eye, Book, Tablet, Headphones } from 'lucide-react';
import Link from 'next/link';

const BookCards = ({ books, headline }) => {
  return (
    <div className=" md:my-16 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-primary-dark/80 dark:text-gray-100 md:my-12">
        {headline}
      </h2>

      
 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 rounded-md">
    {books.map((book) => (
      <div key={book.id} className="mb-16 rounded-md space-y-4">
        <Link href={`/book/${book.id}`} passHref>
          <div className="block">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src={book.image_url}
                alt={book.book_title}
                className="rounded-md mx-auto w-full h-auto md:w-auto md:h-72 object-fit transition duration-300 transform hover:scale-110"
              />

              <div className="p-4 flex flex-col justify-between mx-auto">
              <div className="text-center mb-2">
              <h3 className="text-center mx-auto text-xl md:text-base font-semibold text-primary-dark/80 dark:text-white truncate" style={{ width: '200px' }}>
  {book.book_title.length > 20 ? `${book.book_title.slice(0, 20)}...` : book.book_title}
</h3>
                <p className="text-lg md:text-sm text-gray-500 dark:text-gray-400">{book.author_name}</p>
                <p className="text-base md:text-xs text-gray-400 dark:text-gray-500">{book.publisher}</p>
              </div>

                <div className="mx-auto text-sm text-center text-primary-dark/80 dark:text-gray-300 space-y-2">
                  {/* Book Price Icon */}
                  <div className="flex items-center gap-2">
                    <Book className="w-5 h-5 text-blue-600" />
                    <p>Book Price: <span className="text-primary-dark/80 font-semibold">KES  {book.book_price}</span></p>
                  </div>
                  {/* EBook Price Icon */}
                  <div className="flex items-center gap-2 text-sm">
                    <Tablet className="w-5 h-5 text-orange-600" />
                    <p>Ebook Price: <span className="text-primary-dark/70 font-semibold">KES {book.ebook_price}</span></p>
                  </div>
                  {/* AudioBook Price Icon */}
                  <div className="flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-yellow-600" />
                    <p>AudioBook: <span className="text-primary-dark/80 font-semibold">KES {book.audio_price}</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    className=" bg-primary-dark/80 text-white p-2 rounded-md  hover:bg-primary-light transition"
                    aria-label="Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-accent-dark/80 text-white p-2 rounded-md  hover:bg-accent transition"
                    aria-label="Add to Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    className="bg-orange-600/90 text-white p-2 rounded-md  hover:bg-primary-light transition"
                    aria-label="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))}
 
</div>

    </div>
  );
};

BookCards.propTypes = {
  headline: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      book_title: PropTypes.string.isRequired,
      author_name: PropTypes.string.isRequired,
      book_price: PropTypes.number.isRequired,
      ebook_price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BookCards;
