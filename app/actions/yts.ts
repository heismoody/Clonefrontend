"use server";

import { getYTSMovieDetails } from "@/lib/yts/client";

export async function getYTSMovieDetailsAction(imdbId: string) {
  if (!imdbId) return null;
  return await getYTSMovieDetails(imdbId);
}
