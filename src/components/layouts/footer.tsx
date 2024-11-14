import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <span className="text-sm">
            © 2024 YT Downloader. All rights reserved.
          </span>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/nabinkhair42/yt-downloader"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
