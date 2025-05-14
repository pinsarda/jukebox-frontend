import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SourceType = "album" | "music" | "artist";

export type Fetcher = "youtube" | "spotify" | "yt_music" | "deezer" | "apple_music";