import { Ref, prop } from "@typegoose/typegoose";
import { Profile } from "./profile";
import { User } from "./user";

export class Company extends Profile {
  @prop()
  sector: string;

  @prop()
  workerCount: string;

  @prop()
  tags: string[];

  @prop({ ref: () => User })
  creator: Ref<User>;
}
