import app from "./app.js";
import { Config } from "./config/index.js";
import logger from "./config/logger.js";

const startServer = async () => {
  const Port = Config.PORT;
  try {
    app.listen(Port, () => logger.info(`Listening on port : ${Port}`));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer();
