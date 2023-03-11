import axios from "axios";

const url = "http://localhost:5000/posts";

export async function getAllPosts() {
  const result = await axios.get(url);
  return result.data;
}

export async function createPost(newPost) {
  const result = await axios.post(url, newPost);
  return result.data;
}

export async function deletePost(id) {
  const result = await axios.delete(url + `/${id}`);
  return result.data;
}
