import { Db } from "mongodb";

export class Creator {
  public static async create(db: Db) {
    this.createCollections(db);
    this.createViews(db);
  }
  static createViews(db: Db) {}
  static createCollections(db: Db) {
    const collections = [
      {
        name: "users",
        views: [
          {
            name: "secure_users",
            project: {
              password: 0,
            },
          },
        ],
      },
    ];
    collections.forEach((item) => {
      const exists = db.listCollections({ name: item }).hasNext();

      if (!exists) {
        db.createCollection(item.name);
        if (item.views.length > 0) {
          for (let view of item.views) {
            db.createCollection(view.name, {
              viewOn: item.name,
              pipeline: [{ $project: view.project }],
            });
          }
        }
      }
    });
  }
}
