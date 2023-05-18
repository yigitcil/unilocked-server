import { getModelForClass, mongoose } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose/lib/prop";

export class Role {
  @prop({ index: true })
  name: string;
  @prop()
  color: string;
  @prop()
  icon: string;
  @prop({ index: true })
  default: boolean;
  @prop()
  guests: boolean;
  @prop()
  created_at: Date;
  @prop()
  updated_at: Date;
  @prop()
  description: string;
  @prop({ index: true })
  type: string;
  @prop()
  internal: number;

  @prop({ type: () => String })
  permissions: mongoose.Types.Array<string>;
}

const RoleModel = getModelForClass(Role);

export { RoleModel };
