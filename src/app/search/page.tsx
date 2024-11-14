
import { Suspense } from 'react'
import { searchVideos } from '@/lib/youtube-api'
import { VideoCard } from '@/components/function/video-card'
import { SearchSkeleton } from '@/components/function/search-skeleton'
import { type Metadata } from 'next'

interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; 
}

export async function generateMetadata(
  { searchParams }: PageProps
): Promise<Metadata> {
  const params = await searchParams; 
  return {
    title: params.q 
      ? `Search results for: ${params.q}`
      : 'Search'
  }
}

export default async function SearchPage({
  searchParams,
}: PageProps) {
  const params = await searchParams; 
  const query = params.q as string;

  if (!query) {
    return <div>Error: No search query provided</div>
  }

  try {
    const videos = await searchVideos(query);

    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          Search Results for: {query}
        </h1>
        <Suspense fallback={<SearchSkeleton />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </Suspense>
      </div>
    )
  } catch (error) {
    return <div>Error: {(error as Error).message}</div>
  }
}