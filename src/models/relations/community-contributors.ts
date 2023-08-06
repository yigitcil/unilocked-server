import { Ref, prop } from "@typegoose/typegoose";
import { User } from "../user";
import { Role } from "../role";

export class CommunityContributors {
    @prop({ ref: () => User })
    user: Ref<User>;

    @prop({ref: () => Role})
    role : Ref<Role>;

    @prop({default: Date.now})
    createdAt: Date;

    @prop({default: Date.now})
    updatedAt: Date;
}
