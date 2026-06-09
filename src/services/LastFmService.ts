import axios from "axios";
import { Config } from "../config/index.js";
import type { LastFmApiTrack, LastFmTrack } from "../types/lastFmTypes.js";
import type { SpotifyService } from "./SpotifyService.js";
import type { Song } from "../types/index.js";

export class LastFmService {
  constructor(private spotifyService: SpotifyService) {}

  async getSimilarTracks(title: string, artist: string) {
    const ROOT_URL = "http://ws.audioscrobbler.com/2.0/";
    const API_KEY = Config.LASTFM_API_KEY;
    const response = await axios.get(ROOT_URL, {
      params: {
        method: "track.getSimilar",
        track: title,
        artist: artist,
        limit: 10,
        api_key: API_KEY,
        format: "json",
      },
    });
    const lastFmData: LastFmTrack[] = response.data.similartracks.track.map(
      (track: LastFmApiTrack) => ({
        title: track.name,
        artist: track.artist.name,
        score: Number(track.match),
        playcount: Number(track.playcount),
      }),
    );

    const songs = await Promise.all(
      lastFmData.map((song) =>
        this.spotifyService.enrichTrack(song.title, song.artist),
      ),
    );

    const enrichedTracksData = songs.filter(
      (song): song is Song => song !== null,
    );

    return enrichedTracksData;
  }
}
