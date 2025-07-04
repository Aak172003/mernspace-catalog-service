import app from "./app";
import logger from "./config/logger";
import config from "config";

const startServer = () => {
    const PORT: number = config.get("server.port") || 5503;

    try {
        app.listen(PORT, () => {
            logger.info("Server Listening on port", { port: PORT });
            console.log(`Listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

startServer();
