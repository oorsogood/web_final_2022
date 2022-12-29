import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    time: { type: Date, required: true },
    description: String
});
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;