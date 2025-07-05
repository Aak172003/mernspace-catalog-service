import app from "./app";
import logger from "./config/logger";
import config from "config";

const startServer = () => {
    const PORT: number = config.get("server.port") ?? 5503;

    try {
        app.listen(PORT, () => {
            logger.info("Server Listening on port", { port: PORT });
            logger.debug("Server configuration", {
                port: config.get("server.port"),
                nodeEnv: config.get("server.node_env"),
            });
        });
    } catch (error) {
        logger.error("Error starting server", { error });
        process.exit(1);
    }
};

startServer();
