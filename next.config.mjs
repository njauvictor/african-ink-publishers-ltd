/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    
  },
  images: {
    domains: ['res.cloudinary.com', 'imagedelivery.net'], // Added 'imagedelivery.net'
  },
};

export default nextConfig;
