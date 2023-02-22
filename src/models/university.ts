import { getModelForClass, prop } from "@typegoose/typegoose";

export class University {
    @prop()
    name: string;
    @prop()
    icon_url: any;
    @prop()
    city: string;
    @prop()
    address: string;
}

const UniversityModel = getModelForClass(University)

export {UniversityModel}