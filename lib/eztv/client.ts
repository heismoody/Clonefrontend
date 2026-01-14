import { EZTVResponse, EZTVTorrent } from "./types";

const BASE_URL = "https://eztv.re/api/get-torrents";

export async function getEZTVTorrents(imdbId: string): Promise<EZTVTorrent[]> {
  let allTorrents: EZTVTorrent[] = [];
  let page = 1;
  const limit = 100;
  let hasMore = true;

  // Remove 'tt' prefix if present
  const cleanImdbId = imdbId.replace("tt", "");

  try {
    while (hasMore) {
      const response = await fetch(
        `${BASE_URL}?imdb_id=${cleanImdbId}&limit=${limit}&page=${page}`,
        {
          next: { revalidate: 3600 }, // Cache for 1 hour
        }
      );

      if (!response.ok) {
        throw new Error(`EZTV API error: ${response.statusText}`);
      }

      const data: EZTVResponse = await response.json();

      if (!data.torrents || data.torrents.length === 0) {
        hasMore = false;
      } else {
        allTorrents = [...allTorrents, ...data.torrents];

        // Check if we've fetched all torrents
        if (page * limit >= data.torrents_count) {
          hasMore = false;
        } else {
          page++;
          // Add a small delay to be nice to the API
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    }

    return allTorrents;
  } catch (error) {
    console.error("Error fetching EZTV torrents:", error);
    return [];
  }
}
