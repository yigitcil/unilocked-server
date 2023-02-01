import { Request } from "express";
import { FindCursor } from "mongodb";

export default class PaginateService {

    /**
     * Usage: paginate(req,collection.countDocuments(),collection.find())
     * @param req 
     * @param count 
     * @param query 
     * @returns 
     */
  static async paginate(req: Request, count = -1, query: FindCursor) {
    let page = parseInt((req.query.page as string) || "1");
    let perPage = parseInt((req.query.perPage as string) || "15");

    const data = await query
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray();

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
