import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String, required: true },
    text: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

export default Post;