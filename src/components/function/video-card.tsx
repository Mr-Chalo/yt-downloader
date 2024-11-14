'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { VideoSearchResult } from '@/lib/youtube-api'

interface VideoCardProps {
  video: VideoSearchResult;
}

const formats = [
  { value: 'mp4-360p', label: 'MP4 360p' },
  { value: 'mp4-720p', label: 'MP4 720p' },
  { value: 'mp3', label: 'MP3 (Audio Only)' },
]

export function VideoCard({ video }: VideoCardProps) {
  const [selectedFormat, setSelectedFormat] = useState(formats[0].value)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(`/api/proxy?v=${video.id}&itag=${getItagForFormat(selectedFormat)}`)
      if (!response.ok) throw new Error('Download failed')
      
      const data = await response.json()
      
      // Create a link and trigger the download
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = data.url
      a.download = `${data.title}.${data.ext}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      toast.success('Download started!')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download the video. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const getItagForFormat = (format: string) => {
    switch (format) {
      case 'mp4-360p':
        return '18'
      case 'mp4-720p':
        return '22'
      case 'mp3':
        return '140'
      default:
        return '18'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-4">
          <Image
            src={video.thumbnail}
            alt={video.title}
            width={320}
            height={180}
            className="w-full rounded-md"
          />
          <h2 className="mt-2 text-lg font-semibold line-clamp-2">{video.title}</h2>
          <p className="text-sm text-gray-500">{video.channelTitle}</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              {formats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleDownload} className="w-full" disabled={isDownloading}>
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? 'Downloading...' : 'Download'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}