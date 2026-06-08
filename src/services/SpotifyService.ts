import type { Song } from "../types/index.js";

export class SpotifyService {
  async find(title: string): Promise<Song[]> {
    return [
      { title: title, artist: "artist", spotifyUrl: "url", imageUrl: "url" },
    ];
  }
}
