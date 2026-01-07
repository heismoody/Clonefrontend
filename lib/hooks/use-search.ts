import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { searchMultiAction } from "@/app/actions/tmdb";

export function useSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      return await searchMultiAction(debouncedQuery);
    },
    enabled: debouncedQuery.length > 0,
  });
}
