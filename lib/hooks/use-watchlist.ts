import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { WatchlistItem } from "@/lib/db/schema";

// Fetch watchlist
export function useWatchlist() {
  return useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const res = await fetch("/api/watchlist");
      if (!res.ok) throw new Error("Failed to fetch watchlist");
      return res.json() as Promise<WatchlistItem[]>;
    },
  });
}

// Add to watchlist
export function useAddToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: {
      movieId: number;
      title: string;
      posterUrl: string | null;
      year: string;
      mediaType: "movie" | "tv";
    }) => {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to add to watchlist");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}

// Remove from watchlist
export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/watchlist?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove from watchlist");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
}
