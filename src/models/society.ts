import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user";

export class Society {
    @prop()
    name: string;

    @prop()
    created_at: Date;
    
    @prop()
    creator: User;

    @prop({ type: () => [User] })
    admins: User[];

    @prop({ type: () => [User] })
    members?: User[];

    @prop()
    description?: string;

    @prop()
    email?: string;

    @prop()
    icon_url?: string;

    @prop({ type: () => [String] })
    links?: string[]; //Social media profiles etc.
}


