import { ObjectId } from "mongodb";

export class University {
    id: ObjectId;
    name: string;
    icon_url: any;
    city: string;
    address: string;
}