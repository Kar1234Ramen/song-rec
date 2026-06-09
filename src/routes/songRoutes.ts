import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { SongController } from "../controllers/SongController.js";
import { SpotifyService } from "../services/SpotifyService.js";
import songQueryValidator from "../validators/songQueryValidator.js";
import songRecValidator from "../validators/songRecValidator.js";
import { LastFmService } from "../services/LastFmService.js";

const router = express.Router();
const spotifyService = new SpotifyService();

const lastFmService = new LastFmService(spotifyService);

const songController = new SongController(spotifyService, lastFmService);

router.get(
  "/search",
  songQueryValidator,
  (req: Request, res: Response, next: NextFunction) =>
    songController.search(req, res, next),
);

router.get(
  "/recs",
  songRecValidator,
  (req: Request, res: Response, next: NextFunction) =>
    songController.recs(req, res, next),
);

export default router;
