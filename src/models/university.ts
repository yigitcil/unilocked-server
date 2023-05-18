import { Ref, getModelForClass, prop } from "@typegoose/typegoose";

export class University {
    @prop()
    name: string;
    @prop()
    icon_url: any;
    @prop()
    city: string;
    @prop()
    address: string;
    @prop({ ref: () => Event ,select:false})
    events?: Ref<Event>[];
}

