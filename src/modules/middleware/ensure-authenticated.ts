import { tr } from "@modules/services/translator";
import { NextFunction, Request, Response } from "express";

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(403)
    .send({ error: "403 Forbidden", message: tr("User is not logged in") });
}
