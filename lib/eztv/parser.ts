import { EZTVTorrent, ParsedShow } from "./types";

export function parseEZTVTorrents(torrents: EZTVTorrent[]): ParsedShow {
  const seasonPacks: EZTVTorrent[] = [];
  const episodes: Record<string, Record<string, EZTVTorrent[]>> = {};

  torrents.forEach((torrent) => {
    const isSeasonPack =
      torrent.episode === "0" ||
      /S\d+\s+Pack/i.test(torrent.title) ||
      /Season\s+\d+\s+Complete/i.test(torrent.title);

    if (isSeasonPack) {
      seasonPacks.push(torrent);
    } else {
      const season = torrent.season;
      const episode = torrent.episode;

      if (!episodes[season]) {
        episodes[season] = {};
      }
      if (!episodes[season][episode]) {
        episodes[season][episode] = [];
      }

      episodes[season][episode].push(torrent);
    }
  });

  // Sort Season Packs: Seeds (desc) -> Size (desc)
  seasonPacks.sort((a, b) => {
    if (b.seeds !== a.seeds) return b.seeds - a.seeds;
    return parseFloat(b.size_bytes) - parseFloat(a.size_bytes);
  });

  // Sort Episodes: Seeds (desc) -> Size (desc)
  Object.keys(episodes).forEach((season) => {
    Object.keys(episodes[season]).forEach((episode) => {
      episodes[season][episode].sort((a, b) => {
        if (b.seeds !== a.seeds) return b.seeds - a.seeds;
        return parseFloat(b.size_bytes) - parseFloat(a.size_bytes);
      });
    });
  });

  return {
    seasonPacks,
    episodes,
  };
}
