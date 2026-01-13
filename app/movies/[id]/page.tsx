import { Header } from "@/components/navigation/header";
import { MediaCard } from "@/components/media/media-card";
import { TrailerModal } from "@/components/media/trailer-modal";
import {
  getMovieDetails,
  getSimilarMovies,
  getMovieImages,
  getImageUrl,
  getMovieCredits,
} from "@/lib/tmdb/client";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    notFound();
  }

  const [movie, similar, credits] = await Promise.all([
    getMovieDetails(movieId),
    getSimilarMovies(movieId),
    getMovieCredits(movieId),
  ]);

  const director = credits.crew.find((person) => person.job === "Director");
  const cast = credits.cast.slice(0, 10);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background -mt-16">
        {/* Hero Section */}
        <div className="relative h-[90vh]">
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
            <div className="flex flex-col md:flex-row gap-8 items-end w-full">
              {/* Poster */}
              <div className="hidden md:block flex-shrink-0">
                <img
                  src={getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  className="w-64 rounded-lg shadow-2xl hover-scale"
                />
              </div>

              {/* Details */}
              <div className="flex-1 text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
                  {movie.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-200 mb-6 text-sm md:text-base">
                  <span>{movie.release_date?.substring(0, 4)}</span>
                  <span>•</span>
                  <span>{movie.runtime} min</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl line-clamp-3 text-shadow-sm">
                  {movie.overview}
                </p>

                <div className="flex space-x-4">
                  <a
                    href={`/watch?id=${movie.id}&type=movie`}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover-scale flex items-center gap-2"
                  >
                    <span>▶</span> Watch Now
                  </a>
                  <TrailerModal
                    id={movie.id}
                    type="movie"
                    trigger={
                      <button className="px-8 py-3 bg-white/20 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/30 transition-smooth">
                        Watch Trailer
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 space-y-16">
          {/* Cast & Crew */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Cast & Crew</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {cast.map((person) => (
                <div key={person.id} className="text-center group">
                  <div className="relative overflow-hidden rounded-full w-32 h-32 mx-auto mb-3 border-2 border-transparent group-hover:border-primary transition-smooth">
                    <img
                      src={getImageUrl(person.profile_path, "w500")}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm">{person.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
            {director && (
              <div className="mt-8 p-6 glass rounded-lg inline-flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50">
                  <img
                    src={getImageUrl(director.profile_path, "w500")}
                    alt={director.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-muted-foreground block text-sm mb-1">
                    Director
                  </span>
                  <span className="font-bold text-lg">{director.name}</span>
                </div>
              </div>
            )}
          </section>

          {/* Similar Movies */}
          {similar.results.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {similar.results.slice(0, 12).map((movie) => (
                  <MediaCard key={movie.id} item={movie} mediaType="movie" />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
