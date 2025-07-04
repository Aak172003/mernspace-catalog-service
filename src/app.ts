import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import config from "config";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/", (req, res, next) => {
    res.send({
        message: "Welcome to Catalog Service",
        port: config.get("server.port"),
    });
});

app.use(globalErrorHandler);

export default app;
