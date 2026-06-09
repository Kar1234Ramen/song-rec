import type { NextFunction, Request, Response } from "express";
import type { SpotifyService } from "../services/SpotifyService.js";
import type { Song } from "../types/index.js";
import { validationResult } from "express-validator";
import type { LastFmService } from "../services/LastFmService.js";

export class SongController {
  constructor(
    private spotifyService: SpotifyService,
    private lastFmService: LastFmService,
  ) {}

  async search(req: Request, res: Response, next: NextFunction) {
    const { title } = req.query as { title: string };

    //validation
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      return res.status(400).json({ errors: validate.array() });
    }

    try {
      const searchRes: Song[] = await this.spotifyService.find(title);
      res.json(searchRes);
    } catch (err) {
      next(err);
    }
  }

  async recs(req: Request, res: Response, next: NextFunction) {
    const { title, artist } = req.query as { title: string; artist: string };
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      return res.status(400).json({ errors: validate.array() });
    }
    try {
      const recsRes = await this.lastFmService.getSimilarTracks(title, artist);
      res.json(recsRes);
    } catch (err) {
      next(err);
    }
  }
}
