export type TrackType = {
  id: string;
  title: string;
  artist: string;
  href: string;
  image: string;
  album: string;
  date: string;
  colors: {
    vibrant: string;
    muted: string;
    darkVibrant: string;
    darkMuted: string;
    lightVibrant: string;
    lightMuted: string;
  }
}