import { getVideoDetails } from '@/lib/youtube-api'
import { VideoDetails } from '@/components/function/video-details'
import { DownloadOptions } from '@/components/function/download-options'
import type { ReadonlyURLSearchParams } from 'next/navigation'

export default async function DownloadPage({
  searchParams,
}: { searchParams: ReadonlyURLSearchParams }) {
  const videoUrl = searchParams.get('url')
  
  if (!videoUrl) {
    return <div>Error: No URL provided</div>
  }
  
  try {
    const videoDetails = await getVideoDetails(videoUrl)

    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Download Video</h1>
        <VideoDetails video={videoDetails} />
        <DownloadOptions videoId={videoDetails.id} />
      </div>
    )
  } catch (error) {
    return <div>Error: {(error as Error).message}</div>
  }
}