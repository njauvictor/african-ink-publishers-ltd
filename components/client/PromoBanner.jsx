import React from 'react';
import bookPic from '../client/PromoBanner';

const PromoBanner = () => {
    return (
        <div className='mt-16 py-12 bg-primary-light mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20'>
            <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12'>
                {/* Picture */}
                <div className='md:w-1/2 flex justify-center'>
                    <img src="/assets/book2.webp" alt="Award Books" className='w-96 h-auto object-cover rounded-lg shadow-lg' />
                </div>
                
                {/* Text Content */}
                <div className='md:w-1/2'>
                    <h2 className='text-4xl font-bold mb-6 leading-snug text-white'>2023 National Book Awards for Fiction Shortlist</h2>
                    <p className='text-lg text-gray-200 mb-4'>Discover the captivating stories and remarkable authors that made it to this year's shortlist.</p>
                    <button className='bg-accent-dark text-white font-semibold px-5 py-3 rounded hover:bg-primary-dark transition-all duration-300'>
                        Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PromoBanner;
