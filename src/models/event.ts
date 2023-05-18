import { prop } from "@typegoose/typegoose/lib/prop";
import { University } from "./university";
import { User } from "./user";
import { Ref, getModelForClass } from "@typegoose/typegoose";

export class Event {
    @prop()
    name: string;

    @prop()
    description: string;

    @prop({ ref: () => User })
    creator: Ref<User>

    @prop({ ref: () => University })
    organizator: Ref<University>[];

    @prop()
    eventDate: Date;

    @prop()
    location: string;

    @prop({ ref: () => User })
    participants?: Ref<User>[];
}

