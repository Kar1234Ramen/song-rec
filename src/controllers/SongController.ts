import type { NextFunction, Request, Response } from "express";
import type { SpotifyService } from "../services/SpotifyService.js";
import type { Song } from "../types/index.js";
import { validationResult } from "express-validator";

export class SongController {
  constructor(private spotifyService: SpotifyService) {}

  async search(req: Request, res: Response, next: NextFunction) {
    const { title } = req.query as { title: string };

    //validation
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      return res.status(400).json({ errors: validate.array() });
    }

    try {
      const result: Song[] = await this.spotifyService.find(title);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
