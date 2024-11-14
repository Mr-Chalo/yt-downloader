"use client";
import React, { useState } from "react";
import { Search, LinkIcon } from "lucide-react";
import { SearchForm } from "@/components/function/search-form";
import { UrlInput } from "@/components/function/url-input";
import { Button } from "@/components/ui/button";

const SearchBox = () => {
  const [searchType, setSearchType] = useState<"text" | "url">("text");

  return (
    <div className="bg-background shadow-lg rounded-lg p-8">
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          className={`flex items-center px-6 py-3 rounded-full text-lg font-medium transition-colors duration-200 ${
            searchType === "text"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary-hover"
          }`}
          onClick={() => setSearchType("text")}
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
        <Button
          className={`flex items-center px-6 py-3 rounded-full text-lg font-medium transition-colors duration-200 ${
            searchType === "url"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary-hover"
          }`}
          onClick={() => setSearchType("url")}
        >
          <LinkIcon className="w-5 h-5 mr-2" />
          URL
        </Button>
      </div>
      {searchType === "text" ? <SearchForm /> : <UrlInput />}
    </div>
  );
};

export default SearchBox;
