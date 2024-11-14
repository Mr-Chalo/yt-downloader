import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "YouTube Video Downloader",
  description: "Search and download YouTube videos easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <Toaster />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
