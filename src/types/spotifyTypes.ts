export interface SpotifyTracks {
  name: string;
  artists: {
    name: string;
  }[];
  external_urls: {
    spotify: string;
  };
  album: {
    images: {
      url: string;
    }[];
  };
}
