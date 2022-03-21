import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    laptopType: String,
    issue: String,
    notes:String,
    serialNo:String,
    date:Date,
    name:String,
    email:String,
    selectedFile: String,
});

const Post = mongoose.model('Post', postSchema);

export default Post;