import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: String,
});

const RoleModel = mongoose.model("Role", RoleSchema);

export default RoleModel;
