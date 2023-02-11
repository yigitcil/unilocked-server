import Role from "@models/role";
import { ObjectId } from "mongodb";
import { Post } from "./post";
import { Project } from "./project";
import { University } from "./university";

export interface User{
    _id: ObjectId;
    username?: string; // slug
    first_name?: any;
    last_name?: any;
    avatar_url?: any;
    about?: string;
    gender?: string;
    email?: string; //!
    password?:string; //!
    
    created_at?: Date; //!
    updated_at?: Date; //!
    background?: string; 
    
    avatar?: string;
    available_space?: any //!;
    email_verified_at?: Date //!;
    display_name?: string;
    has_password?: boolean //!;
    roles?: Role[];
    posts?: Post[];
    followers?: User[];
    university?: University;
    projectsParticipated?: Project[];
}