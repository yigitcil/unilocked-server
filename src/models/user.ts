import Role from "@models/role";
import { ObjectId } from "mongodb";

export interface User{
    _id: ObjectId;
    username?: string;
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
    
}