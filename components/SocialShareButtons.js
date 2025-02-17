"use client"; // Mark this as a Client Component
import { FaShareAlt } from "react-icons/fa";

export default function SocialShareButtons({ title }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex gap-3">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-500 transition-colors"
      >
        <FaShareAlt className="w-5 h-5" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-600 transition-colors"
      >
        <FaShareAlt className="w-5 h-5" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-700 transition-colors"
      >
        <FaShareAlt className="w-5 h-5" />
      </a>
    </div>
  );
}