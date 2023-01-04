import mongoose from "mongoose";
import RoleModel from "./roleModel";
import UserModel from "./userModel";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = UserModel;
db.role = RoleModel;

db.ROLES = ["user", "admin"];

export default db;
