import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { Profile } from "./profile";

export class University extends Profile {
  @prop()
  city: string;
  @prop()
  address: string;
  @prop({ ref: () => Event, select: false })
  events?: Ref<Event>[];
}
