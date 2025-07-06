import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Category } from "./category-types";
import { CategoryService } from "./category-service";
import { Logger } from "winston";

export class CategoryController {
    // Dependency Injection -> Here we just receive the service as a parameter
    constructor(
        private categoryService: CategoryService,
        private logger: Logger,
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            // console.log(result.array());
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        const { name, priceConfiguration, attributes } = req.body as Category;
        console.log("name ::::::: ", name);
        console.log("priceConfiguration ::::::: ", priceConfiguration);
        console.log("attributes ::::::: ", attributes);

        // console.log("this ::::::: ", this);
        // Call The Service
        const category = await this.categoryService.create({
            name,
            priceConfiguration,
            attributes,
        });

        // this.logger.info(`Category created successfully:{id: ${category._id}, name: ${category.name}}`);

        console.log("category ::::::: ", category);

        res.json({
            message: "Category created successfully",
            id: category._id,
            name: category.name,
        });
    }
}
