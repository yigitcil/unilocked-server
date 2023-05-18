import { Connector } from "./modules/connector";
import { UserModel, RoleModel } from "./resolved-models";


require("dotenv/config");

const connector = new Connector();
connector.connect(async () => {
  await initRoles();
});

async function initRoles() {
  UserModel.ensureIndexes();

  const userRole = new RoleModel({
    name: "user",
    permissions: ["posts.create", "posts.view"],
    icon: "user",
    color: "#5C469C",
    default: true,
    guests: false,
    created_at: new Date(),
    updated_at: new Date(),
    description: "User role",
    type: "default",
    internal: 1,
  });

  const adminRole = new RoleModel({
    name: "admin",
    permissions: ["admin"],
    icon: "user",
    color: "#5C469C",
    default: false,
    guests: false,
    created_at: new Date(),
    updated_at: new Date(),
    description: "Admin role",
    type: "default",
    internal: 1,
  });

  await Promise.all([userRole.save(), adminRole.save()]);
}
