"use client";
import Image from "next/image";
import Link from "next/link";
import { TrackType } from "@/app/types";
import { DotsThreeIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { useTrack } from "./useTrack";

type TrackProps = {
  track: TrackType;
};

const buttonClass =
  "group border border-neutral-950/10 bg-neutral-50 p-0.5 opacity-80 hover:opacity-100 cursor-pointer shadow-sm";

export const Track = ({ track }: TrackProps) => {
  const hook = useTrack();

  return (
    <div className="relative flex w-full flex-col pb-7.5">
      <div className="z-10">
        <Image
          src={track.image}
          alt={track.title}
          width={640}
          height={640}
          className="w-full shadow-sm"
        />

        <div className="absolute right-0 bottom-0 flex flex-row gap-1">
          <button
            className={`${buttonClass} hover:rotate-4`}
            onClick={hook.openHandler}
          >
            <DotsThreeIcon className="size-5" />
          </button>

          <Link
            href={track.href}
            target="_blank"
            className={`${buttonClass} hover:-rotate-4`}
          >
            <ArrowUpRightIcon className="size-5" />
          </Link>
        </div>
      </div>

      <div
        className={`absolute bottom-0 flex h-fit w-full flex-col gap-1 px-1 pt-3 transition-transform duration-300 ${hook.isOpen ? "z-20 translate-y-full" : ""}`}
      >
        <div
          className="p-2 shadow-sm transition-all duration-300"
          style={{
            background: track.colors.lightMuted,
            opacity: hook.isOpen ? 1 : 0,
            transform: `rotate(${hook.isOpen ? `${Math.random() * 10 - 3}deg` : "0deg"})`,
          }}
        >
          <h3
            className={`line-clamp-1 rotate-1 font-bold ${hook.getTextColorFromHex(track.colors.lightMuted)}`}
          >
            {track.title}
          </h3>
          <p
            className={`ml-1 line-clamp-1 -rotate-2 text-sm ${hook.getTextColorFromHex(track.colors.lightMuted)}`}
          >
            by {track.artist}
          </p>
          <p
            className={`ml-auto line-clamp-1 w-fit -rotate-2 px-2 py-0.5 text-xs ${hook.getTextColorFromHex(track.colors.muted)}`}
            style={{
              background: track.colors.muted,
            }}
          >
            {track.album}
          </p>
        </div>
        <p
          className={`z-1 mb-0.5 w-fit px-2 py-0.5 font-mono text-xs shadow-sm ${hook.getTextColorFromHex(track.colors.vibrant)}`}
          style={{
            background: track.colors.vibrant,
          }}
        >
          + {hook.getDate(track.date)}
        </p>
      </div>
    </div>
  );
};
