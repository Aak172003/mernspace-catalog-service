import express, { NextFunction, Request, Response } from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";

const router = express.Router();
const categoryService = new CategoryService();

// Here we are injecting the service into the controller
const categoryController = new CategoryController(categoryService, logger);

// This will create binding issue
// router.post("/", categoryValidator, categoryController.create);

// This will not create binding issue
router.post(
    "/",
    categoryValidator,
    async (req: Request, res: Response, next: NextFunction) => {
        await categoryController.create(req, res, next);
    },
);

export default router;
