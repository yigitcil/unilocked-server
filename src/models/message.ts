import { getModelForClass, Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";
import { User } from "./user";

export class Message {
    @prop()
    text?: string;
    @prop({ ref: () => User })
    sender?: Ref<User>;
    @prop({ ref: () => User })
    receiver?: Ref<User>;
    @prop({ default: Date.now, index: true })
    createdAt?: Date;
    @prop({ default: Date.now, index: true })
    updatedAt?: Date;
}
