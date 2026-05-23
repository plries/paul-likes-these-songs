import { useState } from "react";

export const useTrack = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => setIsOpen(!isOpen);

  const getTextColorFromHex = (hex: string): "text-neutral-50" | "text-neutral-950" => {
    const clean = hex.replace("#", "")

    const r = parseInt(clean.slice(0, 2), 16)
    const g = parseInt(clean.slice(2, 4), 16)
    const b = parseInt(clean.slice(4, 6), 16)

    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

    return luminance < 0.55 ? "text-neutral-50" : "text-neutral-950"
  }

  return {
    isOpen,
    openHandler,

    getTextColorFromHex,
  };
}