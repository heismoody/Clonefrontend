"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useSearch } from "@/lib/hooks/use-search";
import { getImageUrl } from "@/lib/tmdb/image";
import { Button } from "@/components/ui/button";

export function Header() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { data: searchResults } = useSearch(searchQuery);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient">Popcorns</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-smooth"
            >
              Home
            </Link>
            <Link
              href="/tv"
              className="text-foreground hover:text-primary transition-smooth"
            >
              TV Shows
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className="text-foreground hover:text-primary transition-smooth"
              >
                My List
              </Link>
            )}
          </nav>

          {/* Search */}
          <div className="relative flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Search movies & TV shows..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(true);
              }}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="w-full h-10 px-4 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Search Results Dropdown */}
            {showResults &&
              searchResults &&
              searchResults.results.length > 0 && (
                <div className="absolute top-full mt-2 w-full glass rounded-lg border border-border max-h-96 overflow-y-auto">
                  {searchResults.results.slice(0, 5).map((result) => (
                    <Link
                      key={result.id}
                      href={`/${
                        result.media_type === "movie" ? "movies" : "tv"
                      }/${result.id}`}
                      className="flex items-center p-3 hover:bg-secondary/50 transition-smooth"
                    >
                      <img
                        src={getImageUrl(result.poster_path, "w500")}
                        alt={"title" in result ? result.title : result.name}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="ml-3">
                        <p className="font-semibold text-sm">
                          {"title" in result ? result.title : result.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {"release_date" in result
                            ? result.release_date?.substring(0, 4)
                            : result.first_air_date?.substring(0, 4)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
          </div>

          {/* Auth */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:block">
                  {session.user?.name}
                </span>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
