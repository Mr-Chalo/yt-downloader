import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

// Simple in-memory cache
const cache: {
  [key: string]: {
    data: VideoSearchResult[] | VideoDetails;
    timestamp: number;
  };
} = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedData(key: string): VideoSearchResult[] | VideoDetails | null {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: VideoSearchResult[] | VideoDetails) {
  cache[key] = { data, timestamp: Date.now() };
}

export interface VideoSearchResult {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

export interface VideoDetails extends VideoSearchResult {
  description: string;
}

export async function searchVideos(
  query: string
): Promise<VideoSearchResult[]> {
  const cacheKey = `search:${query}`;
  const cachedResult = getCachedData(cacheKey);
  if (cachedResult) return cachedResult as VideoSearchResult[];

  let result: VideoSearchResult[];

  const videoId = extractVideoId(query);
  if (videoId) {
    // If the query is a video URL, fetch that specific video
    const videoDetails = await getVideoDetails(query);
    result = [videoDetails];
  } else {
    // Otherwise, perform a search
    const response = await youtube.search.list({
      part: ["snippet"],
      q: query,
      type: ["video"],
      maxResults: 12,
    });

    result =
      response.data.items?.map(
        (item): VideoSearchResult => ({
          id: item.id?.videoId ?? "",
          title: item.snippet?.title ?? "",
          thumbnail: item.snippet?.thumbnails?.medium?.url ?? "",
          channelTitle: item.snippet?.channelTitle ?? "",
        })
      ) || [];
  }

  setCachedData(cacheKey, result);
  return result;
}

export async function getVideoDetails(url: string): Promise<VideoDetails> {
  const videoId = extractVideoId(url);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const cacheKey = `video:${videoId}`;
  const cachedResult = getCachedData(cacheKey);
  if (cachedResult) return cachedResult as VideoDetails;

  const response = await youtube.videos.list({
    part: ["snippet"],
    id: [videoId],
  });

  const video = response.data.items?.[0];
  if (!video) throw new Error("Video not found");

  const result: VideoDetails = {
    id: video.id ?? "",
    title: video.snippet?.title ?? "",
    thumbnail: video.snippet?.thumbnails?.medium?.url ?? "",
    channelTitle: video.snippet?.channelTitle ?? "",
    description: video.snippet?.description ?? "",
  };

  setCachedData(cacheKey, result);
  return result;
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}
