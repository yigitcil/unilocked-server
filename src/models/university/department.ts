import { prop } from "@typegoose/typegoose";

export class Department {
    @prop({required: true})
    name: string;

    @prop({required: true})
    code: string;
}