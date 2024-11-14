import Link from 'next/link'
import { Youtube } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Youtube className="w-6 h-6 text-red-600 mr-2" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">YT Downloader</span>
          </Link>
          <div className="flex items-center">
            <Link href="/" className="text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}