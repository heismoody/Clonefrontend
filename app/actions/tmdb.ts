"use server";

import { searchMulti, getSeasonDetails } from "@/lib/tmdb/client";

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
