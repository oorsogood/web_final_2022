import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;