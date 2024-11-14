import { NextResponse } from 'next/server'
import ytdl from 'ytdl-core'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('v')
  const format = searchParams.get('format')

  if (!videoId || !format) {
    return NextResponse.json({ error: 'Missing video ID or format' }, { status: 400 })
  }

  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    const info = await ytdl.getInfo(videoUrl)

    let selectedFormat: ytdl.videoFormat | undefined

    switch (format) {
      case 'mp4-360p':
        selectedFormat = ytdl.chooseFormat(info.formats, { quality: '18' })
        break
      case 'mp4-720p':
        selectedFormat = ytdl.chooseFormat(info.formats, { quality: '22' })
        if (!selectedFormat) {
          // Fallback to the highest quality available if 720p is not available
          selectedFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' })
        }
        break
      case 'mp3':
        selectedFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' })
        break
      default:
        return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
    }

    if (!selectedFormat) {
      return NextResponse.json({ error: 'Format not available' }, { status: 400 })
    }

    // Instead of returning the direct URL, we'll create a proxy endpoint
    const proxyUrl = `/api/proxy?v=${videoId}&itag=${selectedFormat.itag}`

    return NextResponse.json({
      url: proxyUrl,
      contentType: selectedFormat.mimeType,
      title: info.videoDetails.title
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Failed to get video information' }, { status: 500 })
  }
}