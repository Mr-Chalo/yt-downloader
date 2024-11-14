import { Youtube } from "lucide-react";
import React from "react";

const Introduction = () => {
  return (
    <div className="text-center space-y-4">
      <Youtube className="w-20 h-20 text-red-600 mx-auto" />
      <h1 className="text-5xl font-bold">YouTube Video Downloader</h1>
      <p className="text-xl text-gray-600">
        Search, download, and enjoy your favorite YouTube videos offline.
      </p>
    </div>
  );
};

export default Introduction;
