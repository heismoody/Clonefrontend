"use client";

import { Header } from "@/components/navigation/header";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function WatchContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const type = searchParams.get("type");
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  let embedUrl = "";

  if (type === "movie") {
    embedUrl = `https://vidsrcme.ru/embed/movie?tmdb=${id}`;
  } else if (type === "tv" && season && episode) {
    embedUrl = `https://vidsrcme.ru/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Invalid video parameters
          </div>
        )}
      </div>
    </div>
  );
}

export default function WatchPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-8 text-center">
              Loading player...
            </div>
          }
        >
          <WatchContent />
        </Suspense>
      </main>
    </>
  );
}
