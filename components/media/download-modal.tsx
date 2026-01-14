"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, HardDrive, Users, Wifi, Film, Tv } from "lucide-react";
import { useState, useEffect } from "react";
import { getYTSMovieDetailsAction } from "@/app/actions/yts";
import { getEZTVShowDetailsAction } from "@/app/actions/eztv";
import { YTSTorrent } from "@/lib/yts/types";
import { ParsedShow, EZTVTorrent } from "@/lib/eztv/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DownloadModalProps {
  imdbId: string;
  title: string;
  trigger?: React.ReactNode;
  type?: "movie" | "tv";
}

export function DownloadModal({
  imdbId,
  title,
  trigger,
  type = "movie",
}: DownloadModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [movieTorrents, setMovieTorrents] = useState<YTSTorrent[]>([]);
  const [tvShow, setTvShow] = useState<ParsedShow | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  // TV State
  const [selectedSeason, setSelectedSeason] = useState<string>("");

  useEffect(() => {
    if (isOpen && !hasFetched && !isLoading) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          if (type === "movie") {
            const response = await getYTSMovieDetailsAction(imdbId);
            if (response && response.data.movie.torrents) {
              setMovieTorrents(response.data.movie.torrents);
            } else {
              setError("No download links found for this movie.");
            }
          } else {
            const response = await getEZTVShowDetailsAction(imdbId);
            if (
              response &&
              (response.seasonPacks.length > 0 ||
                Object.keys(response.episodes).length > 0)
            ) {
              setTvShow(response);
              // Select first available season by default
              const seasons = Object.keys(response.episodes).sort(
                (a, b) => parseInt(a) - parseInt(b)
              );
              if (seasons.length > 0) setSelectedSeason(seasons[0]);
            } else {
              setError("No download links found for this TV show.");
            }
          }
        } catch (err) {
          console.error("Failed to fetch torrents:", err);
          setError("Failed to load download links. Please try again later.");
        } finally {
          setIsLoading(false);
          setHasFetched(true);
        }
      };

      fetchData();
    }
  }, [isOpen, imdbId, hasFetched, isLoading, type]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setHasFetched(false);
      setMovieTorrents([]);
      setTvShow(null);
      setError(null);
    }
  }, [isOpen]);

  const getMagnetLink = (hash: string, name: string) => {
    const encodedName = encodeURIComponent(name);
    return `magnet:?xt=urn:btih:${hash}&dn=${encodedName}&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://tracker.leechers-paradise.org:6969/announce&tr=udp://9.rarbg.to:2710/announce&tr=udp://p4p.arenabg.com:1337/announce&tr=udp://tracker.cyberia.is:6969/announce`;
  };

  const formatBytes = (bytes: number | string) => {
    const size = typeof bytes === "string" ? parseInt(bytes) : bytes;
    if (isNaN(size) || size === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const TorrentCard = ({
    quality,
    size,
    seeds,
    peers,
    hash,
    name,
    type,
  }: {
    quality?: string;
    size: string | number;
    seeds: number;
    peers: number;
    hash: string;
    name: string;
    type?: string;
  }) => (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {quality && (
            <span className="font-bold text-lg text-primary">{quality}</span>
          )}
          {type && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground uppercase">
              {type}
            </span>
          )}
          <span className="text-sm font-medium line-clamp-1 max-w-[200px] sm:max-w-[300px]">
            {name}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <HardDrive className="w-3 h-3" />
            {/* If size contains space (e.g. "1.2 GB"), it's already formatted (YTS). Otherwise, format it (EZTV). */}
            {size.toString().includes(" ") ? size : formatBytes(size)}
          </div>
          <div className="flex items-center gap-1 text-green-500">
            <Wifi className="w-3 h-3" />
            {seeds} Seeds
          </div>
          <div className="flex items-center gap-1 text-blue-500">
            <Users className="w-3 h-3" />
            {peers} Peers
          </div>
        </div>
      </div>

      <a
        href={getMagnetLink(hash, name)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
      >
        <Download className="w-4 h-4" />
        Magnet
      </a>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl bg-background border-border max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Download {title}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <p className="text-muted-foreground">
                Fetching download links...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>{error}</p>
            </div>
          ) : type === "movie" ? (
            <div className="grid gap-4">
              {movieTorrents.map((torrent, index) => (
                <TorrentCard
                  key={`${torrent.hash}-${index}`}
                  quality={torrent.quality}
                  size={torrent.size}
                  seeds={torrent.seeds}
                  peers={torrent.peers}
                  hash={torrent.hash}
                  name={title}
                  type={torrent.type}
                />
              ))}
            </div>
          ) : (
            tvShow && (
              <Tabs defaultValue="episodes" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="episodes">Episodes</TabsTrigger>
                  <TabsTrigger value="seasons">Complete Seasons</TabsTrigger>
                </TabsList>

                <TabsContent value="episodes" className="space-y-4 mt-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Select Season:</span>
                    <Select
                      value={selectedSeason}
                      onValueChange={setSelectedSeason}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Season" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(tvShow.episodes)
                          .sort((a, b) => parseInt(a) - parseInt(b))
                          .map((season) => (
                            <SelectItem key={season} value={season}>
                              Season {season}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4">
                    {selectedSeason &&
                      Object.keys(tvShow.episodes[selectedSeason])
                        .sort((a, b) => parseInt(a) - parseInt(b))
                        .map((episode) => (
                          <div key={episode} className="space-y-2">
                            <h4 className="font-semibold text-sm text-muted-foreground">
                              Episode {episode}
                            </h4>
                            {tvShow.episodes[selectedSeason][episode].map(
                              (torrent, index) => (
                                <TorrentCard
                                  key={`${torrent.hash}-${index}`}
                                  size={torrent.size_bytes} // Note: EZTV returns bytes, might need formatting
                                  seeds={torrent.seeds}
                                  peers={torrent.peers}
                                  hash={torrent.hash}
                                  name={torrent.title}
                                />
                              )
                            )}
                          </div>
                        ))}
                  </div>
                </TabsContent>

                <TabsContent value="seasons" className="space-y-4 mt-4">
                  {tvShow.seasonPacks.length > 0 ? (
                    <div className="grid gap-4">
                      {tvShow.seasonPacks.map((pack, index) => (
                        <TorrentCard
                          key={`${pack.hash}-${index}`}
                          size={pack.size_bytes}
                          seeds={pack.seeds}
                          peers={pack.peers}
                          hash={pack.hash}
                          name={pack.title}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No complete season packs found.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
