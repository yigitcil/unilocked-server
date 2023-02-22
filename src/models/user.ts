
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Project } from "./project";
import { University } from "./university";
import { Post } from "./post";
import { Role } from "@models/role";
import mongoose from "mongoose";

export class User {
  @prop()
  username?: string; // slug
  @prop()
  first_name?: string;
  @prop()
  last_name?: string;
  @prop()
  avatar_url?: string;
  @prop()
  about?: string;
  @prop()
  gender?: string;
  @prop({select:false})
  email?: string; //!
  @prop({select:false})
  password?: string; //!
  @prop({select:false})
  created_at?: Date; //!
  @prop({select:false})
  updated_at?: Date; //!
  @prop()
  background?: string;
  @prop()
  avatar?: string;
  @prop({select:false})
  available_space?: string; //!;
  @prop({select:false})
  email_verified_at?: Date; //!;
  @prop()
  display_name?: string;
  @prop({select:false})
  has_password?: boolean; //!;
  @prop({ type: () => [Role] })
  roles?: Role[];
  @prop({ type: () => [Post] })
  posts?: Post[];
  @prop({ type: () => [User] })
  followers?: User[];
  @prop()
  university?: University;
  @prop({ type: () => [Project] })
  projectsParticipated?: Project[];
}

const UserModel = getModelForClass(User);

export {UserModel}
