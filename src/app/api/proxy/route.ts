import { NextResponse } from 'next/server'
import ytdl from 'ytdl-core'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get('v')
  const itag = searchParams.get('itag')

  if (!videoId || !itag) {
    return NextResponse.json({ error: 'Missing video ID or itag' }, { status: 400 })
  }

  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    const info = await ytdl.getInfo(videoUrl)
    const format = ytdl.chooseFormat(info.formats, { quality: itag })

    if (!format) {
      return NextResponse.json({ error: 'Format not available' }, { status: 400 })
    }

    // Instead of streaming, we'll return the direct URL and other necessary information
    return NextResponse.json({
      url: format.url,
      contentType: format.mimeType,
      title: info.videoDetails.title,
      ext: format.container
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({ error: 'Failed to get video information' }, { status: 500 })
  }
}