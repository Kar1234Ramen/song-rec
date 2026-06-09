export interface LastFmTrack {
  title: string;
  artist: string;
  score: number;
  playcount: number;
}

export interface LastFmApiTrack {
  name: string;
  artist: {
    name: string;
  };
  match: number;
  playcount: number;
}
