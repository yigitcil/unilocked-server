import { NextFunction, Request, Response } from "express";

export default function jsonError(req:Request,res:Response,next:NextFunction) {
    if (res.statusCode==401) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    } else {
        next();
    }
}