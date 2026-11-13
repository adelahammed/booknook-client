"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import slider1 from "../assets/Slider Image (1).jpg";
import slider2 from "../assets/Slider Image (2).jpg";
import slider3 from "../assets/Slider Image (3).jpg";
import slider4 from "../assets/Slider Image (4).jpg";

const slides = [
  {
    image: slider1,
    title: "Unlock Infinite Worlds Between the Pages",
    subtitle:
      "Immerse yourself in thousands of curated novels, scholarly papers, and timeless classics. Borrow your next adventure with a single click.",
    cta: "Browse Books",
  },
  {
    image: slider2,
    title: "Share Your Books, Inspire Curious Minds",
    subtitle:
      "Join our vibrant readers circle. Contribute your favorite books to the community shelves and empower passionate learners everywhere.",
    cta: "Browse Books",
  },
  {
    image: slider3,
    title: "Discover Stories That Shape Tomorrow",
    subtitle:
      "From astrophysics and deep history to enchanting children tales, expand your horizons with our diverse literary universe.",
    cta: "Browse Books",
  },
  {
    image: slider4,
    title: "Borrow with Ease, Read at Your Own Pace",
    subtitle:
      "A modern borrowing experience designed for modern book lovers. Free, community-focused, and accessible anytime.",
    cta: "Browse Books",
  },
];

export default function HeroSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full h-[460px] sm:h-[520px] md:h-[600px] rounded-3xl bg-muted animate-pulse" />
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full h-[460px] sm:h-[520px] md:h-[600px] rounded-3xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 backdrop-blur-[1px]" />

              <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-20">
                <div className="max-w-2xl space-y-4 sm:space-y-6 text-white">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed max-w-xl">
                    {slide.subtitle}
                  </p>

                  <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href="/all-books"
                      className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:opacity-95 hover:scale-[1.02] transition-all duration-200 group"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>{slide.cta}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
