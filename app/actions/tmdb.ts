"use server";

import {
  searchMulti,
  getSeasonDetails,
  getMovieVideos,
  getTVVideos,
} from "@/lib/tmdb/client";

export async function searchMultiAction(query: string) {
  if (!query) return { results: [] };
  return await searchMulti(query);
}

export async function getSeasonDetailsAction(
  tvId: number,
  seasonNumber: number
) {
  return await getSeasonDetails(tvId, seasonNumber);
}

export async function getVideosAction(id: number, type: "movie" | "tv") {
  if (type === "movie") {
    return await getMovieVideos(id);
  } else {
    return await getTVVideos(id);
  }
}
