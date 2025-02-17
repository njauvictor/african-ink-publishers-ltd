
import { Sparkles } from 'lucide-react';
const About = () => {
  
  return (
    <div>
      {/* Enhanced Section 1: Individualized Care for Authors */}
<section className="bg-gray-50 py-20">
  <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
    
      {/* Main Content */}
      <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-primary-dark mb-6">
            Why Choose African Ink Publishers Ltd
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
            <Sparkles className="w-8 h-8 text-accent-dark" />
            <div className="h-1 w-20 bg-accent-dark rounded-full" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            African Ink Publishers Ltd is your trusted partner in the world of African literature. We understand the challenges of publishing and printing, and we offer a comprehensive solution to meet your needs.
          </p>
        </div> <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Column 1 */}
      <div className="prose prose-lg text-gray-700">
        <h3 className="text-2xl font-semibold mb-4">1. Individualized Care for Authors</h3>
        <p className="mb-6 text-lg">
          At African Ink Publishers Ltd, we believe that every author deserves personalized attention. From the moment you join us, we provide tailored guidance throughout your publishing journey. Whether you're in the pre-press, publishing, or post-publishing phase, our team ensures you are well-informed about the progress of your book. We offer top-notch support, helping you navigate every step with confidence and clarity. Our goal is to make your publishing experience seamless and rewarding.
        </p>

        <h3 className="text-2xl font-semibold mb-4">2. Quality Production and Designs</h3>
        <p className="mb-6 text-lg">
          Quality is at the heart of everything we do. From design and printing to finishing and packaging, we ensure that every book published with us meets the highest standards. Our professional design team creates visually appealing layouts and covers that resonate with your target audience. We take pride in delivering exceptional reader experiences, which in turn ensures author satisfaction. When you publish with us, you can be confident that your book will stand out in both quality and presentation.
        </p>

        <h3 className="text-2xl font-semibold mb-4">3. Flexible Payment Plans</h3>
        <p className="mb-6 text-lg">
          We understand that financial constraints can be a challenge for many authors. That’s why we offer flexible payment plans tailored to your needs. Our goal is to make publishing accessible to everyone, regardless of budget. With our adaptable payment options, you can focus on creating your masterpiece without worrying about upfront costs. We’re here to support you every step of the way, ensuring that your financial concerns are taken care of.
        </p>
      </div>

      {/* Column 2 */}
      <div className="prose prose-lg text-gray-700">
        <h3 className="text-2xl font-semibold mb-4">4. Print on Demand</h3>
        <p className="mb-6 text-lg">
          Say goodbye to the hassle of storing unsold books! Our <strong>Print on Demand</strong> service ensures that your books are printed only when there’s demand, eliminating the need for large print runs and excess inventory. This not only saves you money but also protects you from the burden of dead stock. Whether you're a first-time author or an established writer, our Print on Demand service allows you to work within your financial capabilities while reaching readers worldwide.
        </p>

        <h3 className="text-2xl font-semibold mb-4">5. Author Management</h3>
        <p className="mb-6 text-lg">
          We go beyond just publishing your book. Our <strong>Author Management</strong> services are designed to help you build and sustain a successful writing career. From handling post-publishing roles to managing book promotions, we take charge of the tasks agreed upon between you and our team. Our goal is to free up your time so you can focus on what you do best—writing. With our support, you can navigate the literary world with ease and confidence.
        </p>

        <h3 className="text-2xl font-semibold mb-4">6. Marketing Assistance</h3>
        <p className="mb-6 text-lg">
          Reaching the right audience is crucial for any author’s success. At African Ink Publishers Ltd, we offer comprehensive <strong>marketing assistance</strong> to help you connect with readers across the globe. Through our diverse marketing platforms and techniques, we ensure your book gets the visibility it deserves. From social media campaigns to targeted book promotions, we use innovative strategies to maximize your reach. Let us help you share your story with the world.
        </p>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default About;
