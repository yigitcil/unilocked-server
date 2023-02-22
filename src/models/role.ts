import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";

export class Role {
    @prop()
    name: string;
    @prop()
    color: string;
    @prop()
    icon: string;
    @prop()
    default: boolean;
    @prop()
    guests: boolean;
    @prop()
    created_at: Date;
    @prop()
    updated_at: Date;
    @prop()
    description: string;
    @prop()
    type: string;
    @prop()
    internal: number;
    @prop({type: () => [String]})

    permissions: string[];
}

const RoleModel = getModelForClass(Role);

export {RoleModel}