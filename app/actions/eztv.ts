"use server";

import { getEZTVTorrents } from "@/lib/eztv/client";
import { parseEZTVTorrents } from "@/lib/eztv/parser";

export async function getEZTVShowDetailsAction(imdbId: string) {
  if (!imdbId) return null;
  const torrents = await getEZTVTorrents(imdbId);
  return parseEZTVTorrents(torrents);
}
