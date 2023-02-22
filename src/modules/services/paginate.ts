import { User, UserModel } from "@models/user";
import { AnyParamConstructor, BeAnObject, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { Request } from "express";
import { FindCursor } from "mongodb";
import { Query, QueryWithHelpers } from "mongoose";

export default class PaginateService {
  /**
   * Usage: paginate(req,collection.countDocuments(),collection.find())
   * @param req
   * @param count
   * @param query
   * @returns
   */
  static async paginate<T extends AnyParamConstructor<any>>(
    req: Request,
    model: ReturnModelType<T, BeAnObject>,
    query: any
  ) {
    let page = parseInt((req.query.page as string) || "1");
    let perPage = parseInt((req.query.perPage as string) || "15");

    const count = await model.count();

    const data = await query
      .limit(perPage)
      .skip((page - 1) * perPage)
      .exec();

    if (count != -1) {
      const current_page = page;
      const lastPageItemCount = count % perPage;
      const last_page =
        Math.round(count / perPage) + (lastPageItemCount > 0 ? 1 : 0);
      return {
        current_page,
        last_page,
        per_page: perPage,
        data,
      };
    } else {
      return {
        current_page: page,
        last_page: -1, // unknwon,
        per_page: perPage,
        data,
      };
    }
  }
}
