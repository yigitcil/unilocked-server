import { MongoClient } from 'mongodb'

export class Connector {
    private url = "mongodb://localhost:27017/tau-video"
    private db: MongoClient | undefined
    public connect(callback: any) {

        MongoClient.connect(this.url, (err, db) => {
            if (err) throw err
            console.log("Database created!")
            this.db = db
            callback(db)
        });
    }

    public disconnect() {
        if (this.db !== undefined) {
            this.db.close()
        }
    }
}