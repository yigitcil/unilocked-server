import { Router } from "express";
import { Db } from "mongodb";

export default abstract class BaseController {
  constructor(protected db: Db) {}

  abstract listen(router: Router): void;
}
