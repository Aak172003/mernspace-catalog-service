import app from "./app";
import initDbConnection from "./config/dbConnect";
import logger from "./config/logger";
import config from "config";

const startServer = async () => {
    const PORT: number = config.get("server.port") ?? 5503;

    try {
        // Initialize database connection
        console.log("Initializing database connection");
        await initDbConnection();
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            logger.info("Server Listening on port", { port: PORT });
            logger.debug("Server configuration", {
                port: config.get("server.port"),
                nodeEnv: config.get("server.node_env"),
            });
        });
    } catch (error) {
        logger.error("Error starting server", { error });
        logger.on("finish", () => process.exit(1));
    }
};

void startServer();
