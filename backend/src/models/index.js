import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./userModel");
db.role = require("./roleModel");

db.ROLES = ["user", "admin"];

export default db;