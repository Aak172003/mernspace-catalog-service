import { RequestHandler, Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const asyncWrapper = (requestHandler: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Using Promise.resolve to handle async errors
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            if (error instanceof Error) {
                next(createHttpError(500, error.message));
            }
            return next(
                createHttpError(
                    500,
                    "Internal Server Error Found in Async Wrapper",
                ),
            );
        });
    };
};
