import { Header } from "@/components/navigation/header";
import { MediaCard } from "@/components/media/media-card";
import { TrailerModal } from "@/components/media/trailer-modal";
import {
  getTVDetails,
  getSimilarTVShows,
  getImageUrl,
  getTVCredits,
} from "@/lib/tmdb/client";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function TVDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tvId = parseInt(id);

  if (isNaN(tvId)) {
    notFound();
  }

  const [tv, similar, credits] = await Promise.all([
    getTVDetails(tvId),
    getSimilarTVShows(tvId),
    getTVCredits(tvId),
  ]);

  const cast = credits.cast.slice(0, 10);
  const creators = tv.created_by || [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getImageUrl(
                tv.backdrop_path,
                "original"
              )})`,
            }}
          />
          <div className="absolute inset-0 gradient-overlay" />
        </div>

        <div className="container mx-auto px-4 -mt-64 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(tv.poster_path, "w500")}
                alt={tv.name}
                className="w-64 rounded-lg shadow-2xl"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{tv.name}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                <span>{tv.first_air_date?.substring(0, 4)}</span>
                <span>•</span>
                <span>{tv.number_of_seasons} Seasons</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span>{tv.vote_average.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {tv.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <TrailerModal
                  id={tv.id}
                  type="tv"
                  trigger={
                    <button className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg font-semibold transition-smooth flex items-center gap-2">
                      <span>▶</span> Watch Trailer
                    </button>
                  }
                />
              </div>

              <p className="text-lg mb-6">{tv.overview}</p>

              {/* Seasons */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Seasons</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {tv.seasons.map((season) => (
                    <Link
                      key={season.id}
                      href={`/tv/${tvId}/season/${season.season_number}`}
                      className="p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-smooth text-center"
                    >
                      <div className="font-semibold">{season.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {season.episode_count} Episodes
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cast & Crew */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Cast & Crew</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {cast.map((person) => (
                <div key={person.id} className="text-center group">
                  <div className="relative overflow-hidden rounded-full w-24 h-24 mx-auto mb-2 border-2 border-transparent group-hover:border-primary transition-smooth">
                    <img
                      src={getImageUrl(person.profile_path, "w500")}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-1">
                    {person.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>

            {creators.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {creators.map((creator) => (
                  <div
                    key={creator.id}
                    className=" px-4 py-2 rounded-lg flex items-center gap-3"
                  >
                    {creator.profile_path && (
                      <img
                        src={getImageUrl(creator.profile_path, "w500")}
                        alt={creator.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <span className="text-xs text-muted-foreground block">
                        Creator
                      </span>
                      <span className="font-semibold text-sm">
                        {creator.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Similar Shows */}
          {similar.results.length > 0 && (
            <section className="mt-16 mb-16">
              <h2 className="text-2xl font-bold mb-6">Similar TV Shows</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {similar.results.slice(0, 10).map((show) => (
                  <MediaCard key={show.id} item={show} mediaType="tv" />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
