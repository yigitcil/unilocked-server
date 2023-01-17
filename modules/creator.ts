import { Db } from "mongodb";

export class Creator {

    public static async create(db: Db) {
        const collections = [
            'users' // Database tables will be here
        ]
        collections.forEach((item) => {
            const exists = db.listCollections({ name: item })
                .hasNext()
            if (!exists) {
                db.createCollection(item);
            }
        })
    }
}