import { Header } from "@/components/navigation/header";
import { MediaCard } from "@/components/media/media-card";
import {
  getPopularTVShows,
  getTopRatedTVShows,
  getTrendingTVShows,
} from "@/lib/tmdb/client";

export default async function TVShowsPage() {
  const [popular, topRated, trending] = await Promise.all([
    getPopularTVShows(),
    getTopRatedTVShows(),
    getTrendingTVShows(),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 space-y-12">
          {/* Top Rated */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Top Rated TV Shows</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {topRated.results.slice(0, 10).map((show) => (
                <MediaCard key={show.id} item={show} mediaType="tv" />
              ))}
            </div>
          </section>

          {/* Trending */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Trending Today</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {trending.results.slice(0, 10).map((show) => (
                <MediaCard key={show.id} item={show} mediaType="tv" />
              ))}
            </div>
          </section>

          {/* Popular */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Popular Downloads</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {popular.results.slice(0, 10).map((show) => (
                <MediaCard key={show.id} item={show} mediaType="tv" />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
