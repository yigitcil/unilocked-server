import { prop } from "@typegoose/typegoose";
import { Profile } from "./profile";

export class Company extends Profile{
    @prop()
    sector : string;

    @prop()
    workerCount : string;
}