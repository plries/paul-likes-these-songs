import dotenv from "dotenv"
import fs from "fs/promises"
import { Vibrant } from "node-vibrant/node"
import { songs } from "@/content/songs"

dotenv.config()

const getToken = async () => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_ID + ":" + process.env.SPOTIFY_SECRET
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
  })

  const data = await res.json()

  return data.access_token
}

const getTrack = async (q: string, token: string) => {
  const res = await fetch(
    `https://api.spotify.com/v1/search?type=track&limit=1&q=${encodeURIComponent(q)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await res.json()

  return data.tracks.items[0]
}

const getPalette = async (image: string) => {
  const palette = {
    vibrant: (await Vibrant.from(image).getPalette()).Vibrant?.hex,
    muted: (await Vibrant.from(image).getPalette()).Muted?.hex,
    darkVibrant: (await Vibrant.from(image).getPalette()).DarkVibrant?.hex,
    darkMuted: (await Vibrant.from(image).getPalette()).DarkMuted?.hex,
    lightVibrant: (await Vibrant.from(image).getPalette()).LightVibrant?.hex,
    lightMuted: (await Vibrant.from(image).getPalette()).LightMuted?.hex,
  }

  return palette
}

async function main() {
  const token = await getToken()

  if (!token) {
    throw new Error("Failed to get Spotify token")
  }
  
  const enriched = await Promise.all(
    songs.map(async (song) => {
      const q = `${song.name} ${song.artist}`
      const track = await getTrack(q, token)

      if (!track) {
        throw new Error(`No metadata found for ${q}`)
      }

      const image = track.album.images[0].url
      const colors = await getPalette(image)

      return {
        id: track.id,
        href: track.external_urls.spotify,
        title: track.name,
        artist: track.artists.map((artist: any) => artist.name).join(", "),
        album: track.album.name,
        date: song.date,
        image,
        colors,
      }
    })
  )

  await fs.writeFile(
    "generated/tracks.json",
    JSON.stringify(enriched, null, 2)
  )
}


main()