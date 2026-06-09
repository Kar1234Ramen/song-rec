import { config } from "dotenv";
config();

const {
  PORT,
  NODE_ENV,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  LASTFM_API_KEY,
} = process.env;

export const Config = {
  PORT,
  NODE_ENV,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  LASTFM_API_KEY,
};
