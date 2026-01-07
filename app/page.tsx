import { Header } from "@/components/navigation/header";
import { MediaCard } from "@/components/media/media-card";
import { HeroCarousel } from "@/components/media/hero-carousel";
import {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "@/lib/tmdb/client";

export default async function HomePage() {
  const [popular, nowPlaying, upcoming] = await Promise.all([
    getPopularMovies(),
    getNowPlayingMovies(),
    getUpcomingMovies(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background -mt-16">
        <HeroCarousel movies={popular.results} />

        <div className="container mx-auto px-4 space-y-12 pb-16">
          {/* Popular Movies*/}
          <section>
            <h2 className="text-2xl font-bold mb-6">Popular Downloads</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {popular.results.slice(0, 12).map((movie) => (
                <MediaCard key={movie.id} item={movie} mediaType="movie" />
              ))}
            </div>
          </section>

          {/* Now Playing */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Now Playing</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {nowPlaying.results.slice(0, 12).map((movie) => (
                <MediaCard key={movie.id} item={movie} mediaType="movie" />
              ))}
            </div>
          </section>

          {/* Upcoming */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Upcoming Movies</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {upcoming.results.slice(0, 12).map((movie) => (
                <MediaCard key={movie.id} item={movie} mediaType="movie" />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
