"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
import { createClient } from "@supabase/supabase-js";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "./bannerCard.css";

const supabaseUrl = "https://bvlkfsclzidahqfmnwav.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bGtmc2NsemlkYWhxZm1ud2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1ODAzODIsImV4cCI6MjA1MzE1NjM4Mn0.g8-Vku0QStWh1MMUrh3B_sWHTfuMzvL665cpKbltv6k";
const supabase = createClient(supabaseUrl, supabaseKey);

function BannerCard() {
  const [books, setBooks] = useState([]);

  // Fetch books from Supabase
  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("id, book_title, category, image_url");
      if (error) console.error("Error fetching books:", error);
      else setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div className="banner-card">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Navigation]}
        navigation
        className="mySwiper"
      >
        {books.map((book, id) => (
          <SwiperSlide key={id} className="card">
            <div
              className="card-content"
              style={{
                backgroundImage: `url(${book.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="overlay">
                <h3 className="book-title opacity-80">{book.book_title}</h3>
                <p className="category mb-2">{book.category}</p>
                <button
                  onClick={() => (window.location.href = `/book/${book.id}`)}
                  className="read-more"
                >
                  Explore <FaArrowRight />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BannerCard;