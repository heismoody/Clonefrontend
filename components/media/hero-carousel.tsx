"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { getImageUrl } from "@/lib/tmdb/image";
import type { Movie } from "@/lib/tmdb/types";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface HeroCarouselProps {
  movies: Movie[];
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  return (
    <div className="relative h-[90vh] mb-12">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        className="h-full w-full"
      >
        {movies.slice(0, 5).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${getImageUrl(
                    movie.backdrop_path,
                    "original"
                  )})`,
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 gradient-overlay" />
              <div className="relative container mx-auto px-4 h-full flex items-end pb-24">
                <div className="max-w-3xl animate-slide-up">
                  <div className="flex items-center space-x-4 mb-4 text-sm md:text-base font-medium">
                    <span className="px-2 py-1 bg-primary text-white rounded text-xs uppercase tracking-wider">
                      Movie
                    </span>
                    <span className="text-gray-300">
                      {movie.release_date?.substring(0, 4)}
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <span>★</span>
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
                    {movie.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8 line-clamp-3 text-shadow-sm">
                    {movie.overview}
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href={`/movies/${movie.id}`}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover-scale flex items-center gap-2"
                    >
                      <span>▶</span> Watch Now
                    </a>
                    <a
                      href={`/movies/${movie.id}`}
                      className="px-8 py-3 bg-white/20 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/30 transition-smooth"
                    >
                      More Info
                    </a>
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
