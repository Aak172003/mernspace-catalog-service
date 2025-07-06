import express from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";
import { asyncWrapper } from "../common/utils/errorHandlerWrapper";
import authenticate from "../common/middlewares/authenticate";
import { canAccess } from "../common/middlewares/canAccess";
import { Roles } from "../common/constants";

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
    authenticate,
    canAccess([Roles.ADMIN]),
    // async (req: Request, res: Response, next: NextFunction) => {
    //     await categoryController.create(req, res, next);
    // },

    // Using async wrapper with proper binding
    asyncWrapper((req, res, next) => categoryController.create(req, res, next)),
);

export default router;
