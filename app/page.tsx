"use client";
import Link from "next/link";
import { WaveformIcon } from "@phosphor-icons/react";
import tracks from "@/generated/tracks.json";
import { Track } from "./components";

export default function Home() {
  return (
    <main className="relative grid min-h-screen bg-neutral-100 px-5 pb-38 font-sans md:px-10">
      <div className="grid min-h-full grid-cols-1 grid-rows-[min-content] gap-4 border-x border-x-neutral-950/5 p-5 md:grid-cols-3 md:p-10 lg:grid-cols-4">
        {tracks
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((track) => (
            <div
              key={track.id}
              className="h-fit p-1"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${track.colors.lightMuted}20, ${track.colors.vibrant}20)`,
              }}
            >
              <Track track={track} />
            </div>
          ))}
      </div>

      <div className="fixed bottom-2 left-12 z-50 flex flex-row items-center gap-1 border border-neutral-950/10 bg-white px-3 py-2 font-medium text-neutral-950 shadow-sm">
        <WaveformIcon className="size-5" />
        <h1>
          <Link
            href="https://paularies.ca"
            className="hover:underline"
            target="_blank"
          >
            paul
          </Link>{" "}
          likes these songs
        </h1>
      </div>
    </main>
  );
}
