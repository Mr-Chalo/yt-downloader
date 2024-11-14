import Image from 'next/image'
import { VideoDetails as VideoDetailsType } from '@/lib/youtube-api'

interface VideoDetailsProps {
  video: VideoDetailsType;
}

export function VideoDetails({ video }: VideoDetailsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Image
        src={video.thumbnail}
        alt={video.title}
        width={320}
        height={180}
        className="rounded-md"
      />
      <div>
        <h2 className="text-xl font-semibold">{video.title}</h2>
        <p className="text-sm text-gray-500">{video.channelTitle}</p>
        <p className="mt-2 text-sm line-clamp-3">{video.description}</p>
      </div>
    </div>
  )
}