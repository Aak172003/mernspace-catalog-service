import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { AuthRequest } from "../types";

export const canAccess = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const new_req = req as AuthRequest;

        console.log("req :::::::::::: ", req);
        console.log("new_req :::::::::::: ", new_req);

        const roleFromToken = new_req.auth.role;

        if (!roles.includes(roleFromToken)) {
            const error = createHttpError(
                403,
                "you don't have enoough permissions",
            );

            next(error);
            return;
        }

        // call next here , because this is a middleware
        next();
    };
};
