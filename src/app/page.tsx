import HowItWorksSection from "@/components/homepage/HowItWorks";
import Introduction from "@/components/homepage/Introduction";
import SearchBox from "@/components/homepage/SearchBox";

export default function Home() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pt-32">
      <Introduction />

      <SearchBox />

      <HowItWorksSection />
    </div>
  );
}
