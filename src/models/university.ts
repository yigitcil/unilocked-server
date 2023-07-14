import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { Profile } from "./profile";
import { User } from "./user";

export class University extends Profile {
  @prop()
  city: string;
  @prop()
  address: string;
  @prop({ ref: () => Event, select: false })
  events?: Ref<Event>[];

  @prop({default: 'University'})
  type: string;

  @prop({ ref: () => User, select: false})
    students?: Ref<User>[];
}
