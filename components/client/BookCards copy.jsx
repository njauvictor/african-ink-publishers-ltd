import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { ShoppingCart, Heart, Eye, Book, Tablet, Headphones } from 'lucide-react';
import Link from 'next/link';

const BookCards = ({ books, headline }) => {
  return (
    <div className="mx-auto my-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-primary-dark/80 dark:text-gray-100 my-6 md:my-12">
        {headline}
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
          1536: { slidesPerView: 4, spaceBetween: 50 },
        }}
        modules={[Pagination]}
        className="w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <SwiperSlide key={book.id} className="mb-16">
              <Link href={`/book/${book.id}`} passHref>
                <div className="block">
                  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                    <img
                      src={book.image_url}
                      alt={book.book_title}
                      className="rounded-md mx-auto px-4 w-auto h-72 object-cover transition duration-300 transform hover:scale-110"
                    />

                    <div className="p-6 flex flex-col justify-between h-60 mt-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-primary-dark/90 dark:text-gray-200 truncate">
                          {book.book_title}
                        </h3>
                        <p className="text-sm text-primary-dark/80 dark:text-gray-400">
                          By: {book.author_name}
                        </p>
                      </div>

                      <div className="text-sm text-primary-dark/80 dark:text-gray-300 space-y-1">
                        {/* Book Price Icon */}
                        <div className="flex items-center gap-2">
                          <Book className="w-5 h-5 text-blue-600" />
                          <p>Book Price: <span className="text-primary-dark/80 font-semibold">KES  {book.book_price}</span></p>
                        </div>
                        {/* EBook Price Icon */}
                        <div className="flex items-center gap-2 text-xs">
                          <Tablet className="w-5 h-5 text-green-600" />
                          <p>EBook Price: <span className="text-primary-dark/80 font-semibold">KES {book.ebook_price}</span></p>
                        </div>
                        {/* AudioBook Price Icon */}
                        <div className="flex items-center gap-2">
                          <Headphones className="w-5 h-5 text-purple-600" />
                          <p>AudioBook Price: <span className="text-primary-dark/80 font-semibold">KES {book.audio_price}</span></p>
                        </div>
                      </div>

                      <div className="flex items-center justify-start gap-4 mt-4">
                        <button
                          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                          aria-label="Add to Cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                          aria-label="Add to Wishlist"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition"
                          aria-label="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
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
