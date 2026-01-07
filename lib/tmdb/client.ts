import type {
  Movie,
  TVShow,
  MovieDetails,
  TVDetails,
  Genre,
  TMDBResponse,
  SearchResult,
  SeasonDetails,
  ImageResponse,
} from "./types";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

if (!API_KEY || !BASE_URL) {
  throw new Error("TMDB API configuration is missing");
}

async function fetchTMDB<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}${
    endpoint.includes("?") ? "&" : "?"
  }api_key=${API_KEY}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }

  return response.json();
}

// Movies
export const getPopularMovies = () =>
  fetchTMDB<TMDBResponse<Movie>>("/movie/popular?language=en-US&page=1");

export const getNowPlayingMovies = () =>
  fetchTMDB<TMDBResponse<Movie>>("/movie/now_playing?language=en-US&page=1");

export const getUpcomingMovies = () =>
  fetchTMDB<TMDBResponse<Movie>>("/movie/upcoming?language=en-US&page=1");

export const getMovieDetails = (id: number) =>
  fetchTMDB<MovieDetails>(`/movie/${id}?language=en-US`);

export const getSimilarMovies = (id: number) =>
  fetchTMDB<TMDBResponse<Movie>>(`/movie/${id}/similar?language=en-US&page=1`);

export const getMovieImages = (id: number) =>
  fetchTMDB<ImageResponse>(`/movie/${id}/images`);

export const getMovieCredits = (id: number) =>
  fetchTMDB<{ cast: any[]; crew: any[] }>(
    `/movie/${id}/credits?language=en-US`
  );

export const getTrendingMovies = () =>
  fetchTMDB<TMDBResponse<Movie>>("/trending/movie/day?language=en-US");

// TV Shows
export const getPopularTVShows = () =>
  fetchTMDB<TMDBResponse<TVShow>>("/tv/popular?language=en-US&page=1");

export const getTopRatedTVShows = () =>
  fetchTMDB<TMDBResponse<TVShow>>("/tv/top_rated?language=en-US&page=1");

export const getTrendingTVShows = () =>
  fetchTMDB<TMDBResponse<TVShow>>("/trending/tv/day");

export const getTVDetails = (id: number) =>
  fetchTMDB<TVDetails>(`/tv/${id}?language=en-US`);

export const getSimilarTVShows = (id: number) =>
  fetchTMDB<TMDBResponse<TVShow>>(`/tv/${id}/similar?language=en-US&page=1`);

export const getTVImages = (id: number) =>
  fetchTMDB<ImageResponse>(`/tv/${id}/images`);

export const getSeasonDetails = (tvId: number, seasonNumber: number) =>
  fetchTMDB<SeasonDetails>(`/tv/${tvId}/season/${seasonNumber}?language=en-US`);

export const getTVCredits = (id: number) =>
  fetchTMDB<{ cast: any[]; crew: any[] }>(`/tv/${id}/credits?language=en-US`);

export const getSeasonCredits = (tvId: number, seasonNumber: number) =>
  fetchTMDB<{ cast: any[]; crew: any[] }>(
    `/tv/${tvId}/season/${seasonNumber}/credits?language=en-US`
  );

// Genres
export const getMovieGenres = () =>
  fetchTMDB<{ genres: Genre[] }>("/genre/movie/list?language=en-US");

export const getTVGenres = () =>
  fetchTMDB<{ genres: Genre[] }>("/genre/tv/list?language=en-US");

// Search
export const searchMulti = (query: string) =>
  fetchTMDB<TMDBResponse<SearchResult>>(
    `/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1`
  );

export { getImageUrl } from "./image";
