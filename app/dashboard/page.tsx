"use client";

import { Header } from "@/components/navigation/header";
import {
  useWatchlist,
  useRemoveFromWatchlist,
} from "@/lib/hooks/use-watchlist";
import { getImageUrl } from "@/lib/tmdb/image";
import { toast } from "sonner";
import Link from "next/link";

export default function DashboardPage() {
  const { data: watchlist, isLoading } = useWatchlist();
  const removeFromWatchlist = useRemoveFromWatchlist();

  const handleRemove = async (id: number, title: string) => {
    try {
      await removeFromWatchlist.mutateAsync(id);
      toast.success(`Removed "${title}" from watchlist`);
    } catch (error) {
      toast.error("Failed to remove from watchlist");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">Loading...</div>
            </div>
          ) : watchlist && watchlist.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {watchlist.map((item) => (
                <div key={item.id} className="group relative">
                  <Link
                    href={`/${item.mediaType === "movie" ? "movies" : "tv"}/${
                      item.movieId
                    }`}
                  >
                    <div className="relative overflow-hidden rounded-lg card-hover">
                      <img
                        src={getImageUrl(item.posterUrl, "w500")}
                        alt={item.title}
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-4">
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.year}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleRemove(item.id, item.title)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth hover:bg-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass rounded-lg">
              <p className="text-xl text-muted-foreground mb-4">
                Your watchlist is empty
              </p>
              <Link href="/">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover-scale">
                  Browse Movies
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
