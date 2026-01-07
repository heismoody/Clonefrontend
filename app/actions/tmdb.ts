"use server";

import { searchMulti } from "@/lib/tmdb/client";

export async function searchMultiAction(query: string) {
  if (!query) return { results: [] };
  return await searchMulti(query);
}
