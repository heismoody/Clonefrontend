"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
import { getVideosAction } from "@/app/actions/tmdb";
import { Video } from "@/lib/tmdb/types";

interface TrailerModalProps {
  id: number;
  type: "movie" | "tv";
  trigger?: React.ReactNode;
}

export function TrailerModal({ id, type, trigger }: TrailerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !trailerKey) {
      const fetchTrailer = async () => {
        setIsLoading(true);
        try {
          const response = await getVideosAction(id, type);
          const videos = response.results;

          // Find the official trailer
          const trailer =
            videos.find(
              (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
            ) ||
            videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
            videos.find((v) => v.site === "YouTube");

          if (trailer) {
            setTrailerKey(trailer.key);
          }
        } catch (error) {
          console.error("Failed to fetch trailer:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchTrailer();
    }
  }, [isOpen, id, type, trailerKey]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Play className="w-4 h-4" />
            Watch Trailer
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 bg-black border-none overflow-hidden aspect-video">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
          </div>
        ) : trailerKey ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <p>No trailer available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
