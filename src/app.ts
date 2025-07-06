import express from "express";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import categoryRouter from "./category/category-router";
const app = express();

app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get("/", (req, res, next) => {
    res.send({
        message: "Welcome to Catalog Service",
        status: "healthy",
        timestamp: new Date().toISOString(),
    });
});

app.use("/categories", categoryRouter);

app.use(globalErrorHandler);

export default app;
