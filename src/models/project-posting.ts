import { ObjectId } from "mongodb";
import { User } from "./user";

enum WorkingType {
        office,
        remote,
        hybrid
    }

export class ProjectPosting {
    _id: ObjectId;
    author: User;
    description: string;
    location: string;
    sector: string;
    title: string;
    educationLevel: string;
    typeOfProject: string;
    workingType: WorkingType;
    language: string;
    created_at: Date;
}