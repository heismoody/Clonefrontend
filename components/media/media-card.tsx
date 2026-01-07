"use client";

import Link from "next/link";
import { getImageUrl } from "@/lib/tmdb/image";
import { useAddToWatchlist } from "@/lib/hooks/use-watchlist";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import type { Movie, TVShow } from "@/lib/tmdb/types";

interface MediaCardProps {
  item: Movie | TVShow;
  mediaType: "movie" | "tv";
}

export function MediaCard({ item, mediaType }: MediaCardProps) {
  const { data: session } = useSession();
  const addToWatchlist = useAddToWatchlist();

  const title = "title" in item ? item.title : item.name;
  const year =
    "release_date" in item
      ? item.release_date?.substring(0, 4)
      : item.first_air_date?.substring(0, 4);

  const handleAddToWatchlist = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please sign in to add to watchlist");
      return;
    }

    try {
      await addToWatchlist.mutateAsync({
        movieId: item.id,
        title,
        posterUrl: item.poster_path,
        year: year || "",
        mediaType,
      });
      toast.success("Added to watchlist!");
    } catch (error: any) {
      toast.error(error.message || "Failed to add to watchlist");
    }
  };

  return (
    <Link href={`/${mediaType === "movie" ? "movies" : "tv"}/${item.id}`}>
      <div className="group relative overflow-hidden rounded-lg card-hover">
        <img
          src={getImageUrl(item.poster_path, "w500")}
          alt={title}
          className="w-full h-[300px] object-cover"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-4">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{year}</span>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm">{item.vote_average.toFixed(1)}</span>
            </div>
          </div>

          <button
            onClick={handleAddToWatchlist}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg text-sm font-semibold transition-smooth"
          >
            + Add to List
          </button>
        </div>
      </div>
    </Link>
  );
}
