import { tr } from "@modules/services/translator";
import { NextFunction, Request, Response } from "express";

export default function ensureAuthrozied(
  permission: string // User a gerek yok
) {



  return (req: Request, res: Response, next: NextFunction) => {  // Burada tekrar fonksiyon döndürdük (express için)
    const user = req.user // User direkt request den alabilirsin

    ///... kalan kısımlar
  }
}
