import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { SongController } from "../controllers/SongController.js";
import { SpotifyService } from "../services/SpotifyService.js";
import songQueryValidator from "../validators/songQueryValidator.js";

const router = express.Router();
const spotifyService = new SpotifyService();

const songController = new SongController(spotifyService);

router.get(
  "/search",
  songQueryValidator,
  (req: Request, res: Response, next: NextFunction) =>
    songController.search(req, res, next),
);

export default router;
