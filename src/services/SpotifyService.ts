import axios from "axios";
import type { Song } from "../types/index.js";
import { Config } from "../config/index.js";
import type { SpotifyTracks } from "../types/spotifyTypes.js";

export class SpotifyService {
  async getAccessToken() {
    const client_id = Config.SPOTIFY_CLIENT_ID;
    const client_secret = Config.SPOTIFY_CLIENT_SECRET;

    const clientCredentials = Buffer.from(
      `${client_id}:${client_secret}`,
    ).toString("base64");

    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      body,
      {
        headers: {
          Authorization: `Basic ${clientCredentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return response.data.access_token;
  }

  async find(title: string): Promise<Song[]> {
    const token = await this.getAccessToken();

    const songObj = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        q: title,
        type: "track",
        limit: 7,
      },
    });

    return songObj.data.tracks.items.map((item: SpotifyTracks) => ({
      title: item.name,
      artist: item.artists[0]?.name,
      spotifyUrl: item.external_urls.spotify ?? "Unknown Artist",
      imageUrl: item.album.images[0]?.url ?? "",
    }));
  }

  async enrichTrack(title: string, artist: string): Promise<Song | null> {
    const token = await this.getAccessToken();

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        q: `track:${title} artist:${artist}`,
        type: "track",
        limit: 1,
      },
    });

    const item = response.data.tracks.items[0];
    if (!item) {
      return null;
    }

    const song: Song = {
      title: item.name,
      artist: item.artists[0]?.name ?? artist,
      spotifyUrl: item.external_urls.spotify ?? "",
      imageUrl: item.album.images[0]?.url ?? "",
    };

    return song;
  }
}
