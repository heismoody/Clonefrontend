import { Header } from "@/components/navigation/header";
import {
  getSeasonDetails,
  getImageUrl,
  getSeasonCredits,
} from "@/lib/tmdb/client";
import { notFound } from "next/navigation";
import { Tooltip } from "@/components/ui/tooltip";

export default async function SeasonDetailsPage({
  params,
}: {
  params: Promise<{ id: string; seasonNumber: string }>;
}) {
  const { id, seasonNumber } = await params;
  const tvId = parseInt(id);
  const seasonNumberInt = parseInt(seasonNumber);

  if (isNaN(tvId) || isNaN(seasonNumberInt)) {
    notFound();
  }

  const [season, credits] = await Promise.all([
    getSeasonDetails(tvId, seasonNumberInt),
    getSeasonCredits(tvId, seasonNumberInt),
  ]);

  const cast = credits.cast.slice(0, 10);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background -mt-16">
        {/* Hero Backdrop */}
        <div className="relative h-[60vh] mb-8">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getImageUrl(
                season.poster_path,
                "original"
              )})`,
            }}
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="absolute inset-0 gradient-overlay" />

          <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
            <div className="flex items-center gap-8">
              <img
                src={getImageUrl(season.poster_path, "w500")}
                alt={season.name}
                className="w-48 rounded-lg shadow-2xl hidden md:block"
              />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
                  {season.name}
                </h1>
                <p className="text-xl text-gray-200 mb-2">
                  {season.episode_count} Episodes •{" "}
                  {season.air_date?.substring(0, 4)}
                </p>
                {/* Season Cast */}
                {cast.length > 0 && (
                  <div className="my-5">
                    <div className="flex w-full overflow-x-auto pb-6 gap-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                      {cast.map((person) => (
                        <Tooltip
                          key={person.id}
                          content={
                            <div className="text-center">
                              <p className="font-bold text-sm mb-0.5">
                                {person.name}
                              </p>
                              <p className="text-xs text-gray-300">
                                {person.character}
                              </p>
                            </div>
                          }
                        >
                          <div className="flex-shrink-0 w-20 md:w-24 group cursor-pointer">
                            <div className="relative overflow-hidden rounded-full w-20 h-20 md:w-24 md:h-24 border-2 border-transparent group-hover:border-primary transition-all duration-300">
                              <img
                                src={getImageUrl(person.profile_path, "w500")}
                                alt={person.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          {/* Episodes */}
          <div className="space-y-4">
            {season.episodes.map((episode) => (
              <div
                key={episode.id}
                className="glass p-6 rounded-lg flex flex-col md:flex-row gap-6 hover:bg-secondary/50 transition-smooth group"
              >
                <div className="relative flex-shrink-0 w-full md:w-64 h-36 rounded-lg overflow-hidden">
                  <img
                    src={getImageUrl(episode.still_path, "w500")}
                    alt={episode.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-smooth" />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">
                      {episode.episode_number}. {episode.name}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {episode.runtime} min
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {episode.overview || "No description available."}
                  </p>
                  <a
                    href={`/watch?id=${tvId}&type=tv&season=${seasonNumber}&episode=${episode.episode_number}`}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover-scale"
                  >
                    <span>▶</span> Watch Episode
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
