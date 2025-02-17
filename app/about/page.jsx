"use client";

import ContactForm from '@/components/client/ContactForm';
import PublishingCTA from '@/components/client/Cta';
import Services from '@/components/client/Services';
import WhoWeAre from '@/components/client/WhoWeAre';
import Head from 'next/head';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
const AboutUs = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>About Us - African Ink Publishers Ltd</title>
        <meta
          name="description"
          content="African Ink Publishers Ltd is the fastest-growing publisher, printer, and distributor of African literature. Discover our mission, vision, services, and why we are the ultimate writer’s guide."
        />
        <meta
          name="keywords"
          content="African literature, book publishing, printing services, ISBN, copyright, African stories, Nairobi publishers"
        />
        <meta property="og:title" content="About Us - African Ink Publishers Ltd" />
        <meta
          property="og:description"
          content="African Ink Publishers Ltd is the fastest-growing publisher, printer, and distributor of African literature."
        />
        <meta property="og:image" content="https://africaninkpublishersltd.com/og-about-us.jpg" />
        <meta property="og:url" content="https://africaninkpublishersltd.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
{/* Hero Section */}
<section
  className="relative bg-cover bg-center bg-no-repeat text-white py-24 md:py-32 mb-12"
  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1611758498818-bfdeec6dc3de?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-primary-dark/60 "></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
    {/* Hero Title */}
    <h1 className="mx-auto max-w-5xl text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-snug mb-6">
      About African Ink Publishers Ltd
    </h1>
    
    {/* Hero Description */}
    <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
      Empowering African voices through storytelling, publishing, and innovation. Our goal is to bring forward diverse narratives and give African writers the platform they deserve.
    </p>

    {/* Call-to-Action Button */}
    <Link
      href="#who-we-are"
      className="inline-block bg-white text-primary-dark px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      Learn More
    </Link>
  </div>
</section>



   {/* Who We Are Section */}
<WhoWeAre />




      {/* Our Story Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto text-center text-5xl font-extrabold text-primary-dark mb-8">Our Story</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
            <Sparkles className="w-8 h-8 text-accent-dark" />
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Founded in Nairobi</h3>
              <p className="text-gray-700 text-lg">
                Established in the heart of Nairobi, we began as a small team passionate about African
                literature and storytelling.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Rapid Growth</h3>
              <p className="text-gray-700 text-lg">
                Over the years, we have grown into a leading publisher, serving authors across Africa
                and beyond.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Our Impact</h3>
              <p className="text-gray-700 text-lg">
                We have published over 500 books, empowering thousands of authors to share their
                stories with the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Values Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto text-center text-5xl font-extrabold text-primary-dark mb-8">Our Mission, Vision, and Values</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
            <Sparkles className="w-8 h-8 text-accent-dark" />
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
          </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Mission</h3>
              <p className="text-gray-700 text-lg">
                To discover, nurture, and amplify African voices through sophisticated publishing
                solutions that foster talent, enhance literature, and cultivate partnerships across and
                beyond Africa.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Vision</h3>
              <p className="text-gray-700 text-lg">
                To emerge as a leading space for the renaissance of Africa’s literature and
                intellectual platform by cultivating a thriving ecosystem for authors, readers, and
                open-minded thinkers across Africa and beyond.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-wxl font-bold text-primary-dark mb-4">Values</h3>
              <ul className="list-disc list-inside text-gray-700 text-lg">
                <li>Professionalism</li>
                <li>Honesty</li>
                <li>Integrity</li>
                <li>Tech-Oriented</li>
                <li>Punctuality</li>
                <li>Kaizen (Continuous Improvement)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <h2 className="mx-auto text-center text-5xl font-extrabold text-primary-dark mb-8">Why Choose Us?</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
            <Sparkles className="w-8 h-8 text-accent-dark" />
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Authentic African Storytelling</h3>
              <p className="text-gray-700">
                We amplify African voices and narratives, ensuring authentic representation.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Professional Editing & Design</h3>
              <p className="text-gray-700">
                High-quality editing, formatting, and cover design tailored to your needs.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Flexible Publishing Models</h3>
              <p className="text-gray-700">
                Choose from self-publishing, hybrid, or traditional publishing options.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Wide Distribution & Marketing</h3>
              <p className="text-gray-700">
                Local and global reach through strategic marketing and distribution.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Author-Friendly Agreements</h3>
              <p className="text-gray-700">
                Fair royalties and transparent contracts for all authors.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-primary-dark mb-4">Print & Digital Publishing</h3>
              <p className="text-gray-700">
                Quality print books and e-books to reach a wider audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PublishingCTA />

      {/* SEO-Rich Content Section */}
      <section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="mx-auto text-center text-5xl font-extrabold text-primary-dark mb-8">Empowering African Voices</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
            <Sparkles className="w-8 h-8 text-accent-dark" />
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
          </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Column 1 */}
      <div className="prose prose-lg text-gray-700 text-lg">
        <p className="mb-8 ">
          At African Ink Publishers Ltd, we are dedicated to empowering African voices and narratives.
          Our mission is to provide a platform for storytelling, extensive research, and knowledge
          dissemination across and beyond the African continent. We believe in the power of literature
          to inspire, educate, and transform societies. Through our work, we aim to bridge the gap
          between African authors and global audiences, ensuring that every story finds its rightful
          place in the world.
        </p>
        <p className="mb-8">
          Our vision is to emerge as a leading space for the renaissance of Africa’s literature and
          intellectual platform. By cultivating a thriving ecosystem for authors, readers, and
          open-minded thinkers, we aim to foster a culture of creativity and innovation. We envision
          a future where African literature is celebrated globally, and our stories shape the
          narratives of tomorrow. This vision drives every decision we make and every service we
          offer.
        </p>
        <p className="mb-8">
          We offer a wide range of services, including book publishing, printing, design, ISBN and
          copyright assistance, marketing, and consultancy. Our team of professionals is committed
          to delivering excellence in every interaction and endeavor. From the initial manuscript
          review to the final printed book, we ensure that every step of the process is handled with
          care and precision. Our goal is to make publishing accessible and rewarding for every
          author.
        </p>
        <p className="mb-8">
          Join us in our journey to revive the reading culture and promote African heritage through
          professional publishing. Together, we can amplify African voices and share authentic
          stories with the world. Whether you are an aspiring author or an established writer, we
          are here to support you every step of the way. Let us help you bring your story to life
          and share it with the world.
        </p>
      </div>

      {/* Column 2 */}
      <div className="prose prose-lg text-gray-700 text-lg">
        <p className="mb-8">
          African Ink Publishers Ltd is more than just a publishing company; we are a movement
          dedicated to uplifting African literature. Our commitment to quality and authenticity
          sets us apart in the industry. We understand the unique challenges faced by African
          authors and strive to provide solutions that cater to their needs. From editorial
          services to marketing strategies, we offer comprehensive support to ensure your success.
        </p>
        <p className="mb-6">
          Our team is composed of passionate individuals who share a common goal: to bring African
          stories to the forefront of global literature. We believe that every story matters and
          that every voice deserves to be heard. By working with us, you become part of a community
          that values creativity, diversity, and excellence. Together, we can create a legacy that
          will inspire future generations.
        </p>
        <p className="mb-6">
          At African Ink Publishers Ltd, we are not just publishers; we are storytellers, innovators,
          and advocates for African literature. Our services are designed to empower authors and
          provide them with the tools they need to succeed. Whether you are looking to publish your
          first book or expand your reach, we are here to help you achieve your goals. Let us be
          your partner in your literary journey.
        </p>
        <p className="mb-6">
          We invite you to explore our services and discover how we can help you bring your story to
          life. From manuscript preparation to book distribution, we offer end-to-end solutions that
          cater to your unique needs. Our team is here to guide you through every step of the process,
          ensuring that your book reaches its full potential. Join us today and be part of a movement
          that is transforming African literature.
        </p>
      </div>
    </div>
  </div>
</section>


<ContactForm />

    </>
  );
};

export default AboutUs;