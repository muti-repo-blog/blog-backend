import { prisma } from "../lib/prisma.js"

async function sendPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();
    if (posts.length === 0) res.json({ posts: "No posts made yet" })
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function sendPost(req, res) {
  const { id } = req.params
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) }
    })

  if (!post) res.json({ posts: "No post found" })

  res.json({ post });
} catch (err) {
  console.error(err);
  res.status(500).json({ error: "Failed to fetch posts" });
}
}


export {
  sendPosts,
  sendPost
}