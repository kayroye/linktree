"use server";

import { kv } from "@vercel/kv";

// Interface for the recent music data
export interface RecentMusic {
  error?: string;
  tracks: {
    name: string;
    artist: string;
    album: string;
    image: string;
    imageSmall: string;
    scrobbleDate: string;
    links?: {
      appleMusic: string;
      spotify: string;
      youtube: string;
      deezer: string;
      amazonMusic: string;
      tiktok: string;
      instagram: string;
    };
  }[];
}

// Interface for the raw track object as returned by Last.fm API
interface LastFmTrack {
  name: string;
  artist: {
    "#text": string;
  };
  album: {
    "#text": string;
  };
  image: {
    "#text": string;
  }[];
  date?: {
    uts: string;
  };
}

export async function getRecentMusic() {
  // Try to get cached value from Vercel KV
  const cached = await kv.get<RecentMusic>("recentMusic");
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=kalusss05&api_key=${process.env.LASTFM_API_KEY}&limit=10&format=json`
    );
    const data = await response.json();

    // Ensure we always have an array to map over
    const apiTracks = data?.recenttracks?.track;
    const trackArray: LastFmTrack[] = Array.isArray(apiTracks)
      ? apiTracks
      : apiTracks
      ? [apiTracks]
      : [];

    const recentMusic: RecentMusic = {
      tracks: trackArray.map((track) => ({
        name: track.name,
        artist: track.artist["#text"],
        album: track.album["#text"],
        image:
          track.image?.[3]?.["#text"] ===
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png"
            ? ""
            : track.image?.[3]?.["#text"] ?? "",
        imageSmall:
          track.image?.[1]?.["#text"] ===
          "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png"
            ? ""
            : track.image?.[1]?.["#text"] ?? "",
        scrobbleDate: track.date?.uts ?? "",
      })),
    };

    // Cache the result in Vercel KV for 60 seconds
    await kv.set("recentMusic", recentMusic, { ex: 60 });

    return recentMusic;
  } catch (error) {
    console.error("Error fetching recent music:", error);
    return { error: "Failed to fetch recent music" };
  }
}
