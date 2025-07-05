import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import config from "config";

const app = express();

console.log("server.port", config.get("server.port"));
console.log("server.node_env", config.get("server.node_env"));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/", (req, res, next) => {
    res.send({
        message: "Welcome to Catalog Service",
        port: config.get("server.port"),
        node_env: config.get("server.node_env"),
    });
});

app.use(globalErrorHandler);

export default app;
