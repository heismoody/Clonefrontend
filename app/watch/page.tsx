"use client";

import { Header } from "@/components/navigation/header";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSeasonDetailsAction } from "@/app/actions/tmdb";
import { getImageUrl } from "@/lib/tmdb/image";
import { cn } from "@/lib/utils";
import { Play, ChevronRight } from "lucide-react";

function WatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  const tvId = id ? parseInt(id) : null;
  const seasonNum = season ? parseInt(season) : null;
  const episodeNum = episode ? parseInt(episode) : null;

  const { data: seasonData, isLoading: isSeasonLoading } = useQuery({
    queryKey: ["season", tvId, seasonNum],
    queryFn: () => getSeasonDetailsAction(tvId!, seasonNum!),
    enabled: type === "tv" && !!tvId && !!seasonNum,
  });

  let embedUrl = "";

  if (type === "movie") {
    embedUrl = `https://vidsrcme.ru/embed/movie?tmdb=${id}`;
  } else if (type === "tv" && season && episode) {
    embedUrl = `https://vidsrcme.ru/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
  }

  const handleEpisodeClick = (epNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("episode", epNum.toString());
    router.push(`/watch?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Player Area */}
      <div className="flex-1 bg-black relative flex flex-col">
        <div className="flex-1 relative">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Invalid video parameters
            </div>
          )}
        </div>

        {/* Mobile Episode List (Horizontal) */}
        {type === "tv" && seasonData && (
          <div className="lg:hidden h-32 border-t border-border bg-background overflow-x-auto flex items-center px-4 gap-4 scrollbar-hide">
            {seasonData.episodes.map((ep) => (
              <button
                key={ep.id}
                onClick={() => handleEpisodeClick(ep.episode_number)}
                className={cn(
                  "flex-shrink-0 w-48 h-24 rounded-md overflow-hidden relative group transition-smooth",
                  episodeNum === ep.episode_number
                    ? "ring-2 ring-primary"
                    : "opacity-70 hover:opacity-100"
                )}
              >
                <img
                  src={getImageUrl(ep.still_path, "w500")}
                  alt={ep.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-xs font-bold text-white px-2 text-center line-clamp-2">
                    {ep.episode_number}. {ep.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      {type === "tv" && (
        <div className="hidden lg:flex flex-col w-80 border-l border-border bg-background h-full">
          <div className="p-4 border-b border-border">
            <h2 className="font-bold text-lg line-clamp-1">
              {seasonData?.name || "Loading episodes..."}
            </h2>
            <p className="text-sm text-muted-foreground">
              {seasonData?.episodes.length || 0} Episodes
            </p>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {isSeasonLoading ? (
              <div className="p-8 text-center text-muted-foreground">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                Loading episodes...
              </div>
            ) : (
              <div className="flex flex-col">
                {seasonData?.episodes.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => handleEpisodeClick(ep.episode_number)}
                    className={cn(
                      "flex items-start gap-3 p-3 hover:bg-secondary/50 transition-smooth text-left group border-b border-border/50",
                      episodeNum === ep.episode_number && "bg-secondary"
                    )}
                  >
                    <div className="relative flex-shrink-0 w-24 h-14 rounded overflow-hidden">
                      <img
                        src={getImageUrl(ep.still_path, "w500")}
                        alt={ep.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                      {episodeNum === ep.episode_number && (
                        <div className="absolute inset-0 bg-primary/40 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-semibold line-clamp-1",
                          episodeNum === ep.episode_number
                            ? "text-primary"
                            : "text-foreground"
                        )}
                      >
                        {ep.episode_number}. {ep.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {ep.overview || "No description available."}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WatchPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-1 overflow-hidden">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          }
        >
          <WatchContent />
        </Suspense>
      </main>
    </div>
  );
}
