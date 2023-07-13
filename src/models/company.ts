import { prop } from "@typegoose/typegoose/lib/prop";
import { Profile } from "./profile";
import { User } from "./user";
import { Ref } from "@typegoose/typegoose";
import { Post } from "./post";
import { ProfileView } from "./profile-view";

export class Company extends Profile {
  
    @prop()
    description: string;
  
    @prop()
    tags: string[];

    @prop({ ref: () => User })
    creator: Ref<User>;
  
    @prop({ ref: () => User })
    followers?: Ref<User>;
  
    @prop({ ref: () => User })
    employees?: Ref<User>[];
  
    @prop({ type: () => [String] })
    links?: string[];
  
    @prop()
    sector: string;
    
    @prop()
    city: string;

    @prop()
    address: string;

    @prop({ ref: () => Post, select: false })
    posts?: Ref<Post>[];
    
    @prop({ ref: () => ProfileView, select: false })
    profileViews?: Ref<ProfileView>[];
  }