import { prop } from "@typegoose/typegoose";

export class Profile {
  @prop()
  name: string;

  @prop()
  avatar?: string;

  @prop()
  type : string;
}
