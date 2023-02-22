import mongoose from "mongoose";

export class Connector {
 
 
  public connect(callback: any) {
    mongoose
      .connect(process.env.DATABASE)
      .then(() => {
        callback();
      });
  }

  public disconnect() {
    mongoose.disconnect()
  }
}
