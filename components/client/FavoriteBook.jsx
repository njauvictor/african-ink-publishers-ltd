import Image from 'next/image'; // Use Next.js Image component for optimization
import Link from 'next/link';

const FavoriteBook = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 my-20 flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="md:w-1/2 flex justify-start">
        {/* Next.js Image component for optimized loading */}
        <Image
          src="/assets/book1.jpg"
          alt="Favorite Book"
          className="rounded-lg shadow-lg"
          width={500} // Provide width and height to optimize loading
          height={350}
        />
      </div>
      
      <div className="space-y-8 md:w-1/2">
        <h2 className="text-5xl font-extrabold leading-tight text-primary-dark text-center md:text-start">
          Find Your Favorite <span className="text-accent-dark">Books Here!</span>
        </h2>
        <p className="text-lg text-gray-700 text-center md:text-start">
          Discover a wide selection of books tailored just for you. Join our community and explore endless possibilities.
        </p>
        
        {/* Statistics Section */}
        <div className="flex flex-col-2 sm:flex-row justify-between gap-6 my-8 mb-12">
          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-primary-dark">800+</h3>
            <p className="text-base text-gray-600">Book Listings</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-extrabold text-primary-dark">550+</h3>
            <p className="text-base text-gray-600">Registered Users</p>
          </div>
          <div className="text-center ">
            <h3 className="text-4xl font-extrabold text-primary-dark">1200+</h3>
            <p className="text-base text-gray-600">PDFs Downloaded</p>
          </div>
        
        </div>

        <div className='mt-12'>
        <Link href="/books" passHref>
          <button className="bg-accent-dark text-white font-semibold px-6 py-4 rounded-lg hover:bg-primary-dark transition-all duration-300">
            Explore Now
          </button>
        </Link>
        </div>
     
     
      </div>
    </div>
  );
};

export default FavoriteBook;
