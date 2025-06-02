'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'

const formats = [
  { value: 'mp4-360p', label: 'MP4 360p' },
  { value: 'mp4-720p', label: 'MP4 720p' },
  { value: 'mp3', label: 'MP3 (Audio Only)' },
]

export function DownloadOptions({ videoId }: { videoId: string }) {
  const [selectedFormat, setSelectedFormat] = useState(formats[0].value)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      // Step 1: Call API to get the download/proxy URL and video title
      const response = await fetch(`/api/download?v=${videoId}&format=${selectedFormat}`)
      if (!response.ok) throw new Error('Download failed (step 1)')
      const data = await response.json()
      if (!data.url) throw new Error('No download URL returned from API')

      // Step 2: Fetch the actual file as a blob from the provided URL
      const fileResponse = await fetch(data.url)
      if (!fileResponse.ok) throw new Error('Download failed (step 2)')
      const blob = await fileResponse.blob()

      // Step 3: Trigger the download in the browser
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `${data.title || 'video'}.${selectedFormat === 'mp3' ? 'mp3' : 'mp4'}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      toast.success('Download started!')
    } catch (error: any) {
      toast.error(`Failed to download the video: ${error.message || error}`)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="space-y-4">
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
        {isDownloading ? 'Downloading...' : 'Download'}
      </Button>
    </div>
  )
}