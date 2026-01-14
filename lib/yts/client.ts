import { YTSResponse } from "./types";

const BASE_URL = "https://yts.lt/api/v2";

export async function getYTSMovieDetails(
  imdbId: string
): Promise<YTSResponse | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie_details.json?imdb_id=${imdbId}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`YTS API error: ${response.statusText}`);
    }

    const data: YTSResponse = await response.json();

    if (data.status !== "ok" || !data.data.movie) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching YTS movie details:", error);
    return null;
  }
}
