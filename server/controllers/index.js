import Post from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    await Post.findByIdAndRemove(id).exec();
    res.send("Successfully deleted");
  } catch (error) {
    console.log(error);
  }
};
