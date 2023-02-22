import { getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

export class University {
    _id: mongoose.Types.ObjectId;;
    name: string;
    icon_url: any;
    city: string;
    address: string;
}

const UniversityModel = getModelForClass(University)

export {UniversityModel}