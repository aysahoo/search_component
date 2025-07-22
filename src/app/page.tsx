"use client";
import { useState, useEffect, useCallback } from "react";
import { GitPullRequest, Star } from "lucide-react";
const mockRepositories = [
  {
    name: "vercel/next.js",
    description: "The React Framework for Production",
    stars: "111.2k",
    pullRequests: "1.2k",
    image: "/vercel_dark.svg",
    openForContributors: true,
  },
  {
    name: "facebook/react",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    stars: "210k",
    pullRequests: "3.5k",
    image: "/react_dark.svg",
    openForContributors: false,
  },
  {
    name: "microsoft/vscode",
    description: "Visual Studio Code",
    stars: "150k",
    pullRequests: "2.5k",
    image: "/vscode.svg",
    openForContributors: true,
  },
  {
    name: "torvalds/linux",
    description: "Linux kernel source tree",
    stars: "160k",
    pullRequests: "1.1k",
    image: "/window.svg",
    openForContributors: false,
  },
  {
    name: "twbs/bootstrap",
    description: "The most popular HTML, CSS, and JS library in the world.",
    stars: "165k",
    pullRequests: "500",
    image: "/star.png",
    openForContributors: true,
  },
  {
    name: "d3/d3",
    description: "Bring data to life with SVG, Canvas and HTML.",
    stars: "110k",
    pullRequests: "200",
    image: "/globe.svg",
    openForContributors: true,
  },
];
export default function Home() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (open && e.key === "Escape") {
        setOpen(false);
      }
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <button
        className="px-6 py-3 rounded bg-foreground text-background text-lg font-semibold shadow hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-foreground/50 transition"
        onClick={() => setOpen(true)}
        aria-label="Open search modal"
      >
        Search
        <span className="ml-3 text-xs bg-black/10 dark:bg-white/10 px-2 py-1 rounded hidden sm:inline-block align-middle">
          ⌘K
        </span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="shadow-2xl p-0 w-full max-w-xl relative overflow-visible">
            {/* Search Bar */}
            <div className="flex items-center border border-white/10 bg-[#18181b]/40 gap-3 px-6 py-3">
              <input
                type="text"
                className="flex-1 border-none text-white py-2 focus:outline-none text-base"
                placeholder="Search for repositories"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setOpen(false);
                  }
                }}
              />
              <button
                className="bg-[#4a1e00]/40 text-orange-500 px-3 py-1 text-xs mr-3"
                onClick={() => setOpen(false)}
              >
                esc
              </button>
            </div>
            {/* Results */}
            <div className="px-6 py-6 border border-white/10 bg-[#18181b]/40 mt-3 rounded relative">
              <div className="text-white/50 text-lg mb-3">Popular</div>
              <div
                className="flex flex-col gap-2 px-3 overflow-y-auto scrollbar-none"
                style={{
                  maxHeight: `calc((3.5rem + 0.5rem) * 3.5)`,
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {mockRepositories.map((repository) => (
                  <div key={repository.name}>
                    <div className="flex items-center gap-3 p-2 border border-white/10 hover:bg-white/5 h-14 min-h-14">
                      <img
                        src={repository.image}
                        alt={repository.name}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="flex flex-row justify-between w-full">
                        <div className="text-white/80 font-medium text-sm">
                          {" "}
                          {repository.name}
                          <div className="flex flex-row items-center text-[11px] text-gray-800 py-1">
                            {" "}
                            <GitPullRequest
                              size={10}
                              className="mr-1 text-purple-600"
                            />
                            {repository.stars}
                            <Star
                              size={10}
                              className="mr-1 text-yellow-500 ml-2"
                            />
                            {repository.pullRequests}
                          </div>
                        </div>
                        <div
                          className={`text-[10px] px-3 h-[22px] flex items-center justify-center self-center ${
                            repository.openForContributors
                              ? "text-green-400 bg-green-900/20"
                              : "text-purple-400 bg-purple-900/20"
                          }`}
                        >
                          {repository.openForContributors
                            ? "Open for contributors"
                            : "Finding investors"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute w-full h-20 bg-gradient-to-b from-transparent to-black/40 bottom-0 left-0" />
          </div>
        </div>
      )}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
